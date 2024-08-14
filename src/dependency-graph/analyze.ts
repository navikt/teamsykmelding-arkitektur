import * as R from 'remeda'
import path from 'node:path'
import fs from 'node:fs'

import { notNull, raise } from '../utils.ts'
import { gitOutputDir } from '../git/git.ts'

import { GithubAction, NaisApplication, NaisOther, NaisTopic, parseYaml, WorkingFiles } from './yaml/parser.ts'
import { globDirForYaml } from './yaml/globber.ts'
import { GithubDeducedEnvironmentNaisFileTuple, getEnvironmentNaisTuple } from './github.ts'
import { NaisSchema } from './yaml/schemas/nais-schema.ts'
import { AppMetadata, IngressMetadata, TopicDependency, TopicMetadata } from './types.ts'
import { NaisTopicSchema } from './yaml/schemas/nais-topic-schema.ts'

export async function analyzeApp(repoName: string): Promise<[string, AppMetadata | TopicMetadata][]> {
    const absoluteRepoDirectory = path.join(gitOutputDir, repoName)

    if (!(await fs.promises.exists(absoluteRepoDirectory))) {
        throw new Error(`Unable to find repo ${absoluteRepoDirectory}`)
    }

    // All nais and GitHub workflow yamls, other files should be ignored during the parsing step
    const relevantFiles = (await globDirForYaml(absoluteRepoDirectory)).filter((it) => !it.includes('demo'))
    // All files are parsed into memory once
    const files = (await Promise.all(relevantFiles.map(parseYaml(absoluteRepoDirectory)))).flat().filter(notNull)

    // Each GitHub workflow is parsed, extracts the corresponding nais file and the environment it is deployed to
    return createApplicationMetadata(files)
}

function createApplicationMetadata(relevantFiles: WorkingFiles[]): [string, AppMetadata | TopicMetadata][] {
    const napsApps = relevantFiles.filter((it): it is NaisApplication => it.type === 'app')
    const naisTopics = relevantFiles.filter((it): it is NaisTopic => it.type === 'topic')
    const naisJobs = relevantFiles.filter((it): it is NaisOther => it.type === 'other')
    const githubWorkflows = relevantFiles.filter((it): it is GithubAction => it.type === 'action')
    const environments = githubWorkflows
        .map((it) => getEnvironmentNaisTuple(it.action, it.repoUrl))
        .filter(notNull)
        .flat()

    return R.pipe(
        environments,
        R.map((env) => [env[0], createAppMetadataForEnv([...napsApps, ...naisJobs, ...naisTopics], env)]),
        R.filter((tuple): tuple is [string, AppMetadata | TopicMetadata] => tuple[1] != null),
        R.uniqueBy(([env, metadata]) =>
            metadata.type === 'app'
                ? `${metadata.namespace}-${env}-${metadata.app}`
                : `${metadata.namespace}-${env}-${metadata.topic}`,
        ),
    )
}

function createIngressMetadata(spec: NaisSchema['spec']): IngressMetadata | null {
    const ingress = spec.ingresses?.at(0)
    if (ingress == null) {
        return null
    }

    return {
        ingress,
        wonderwall: spec.idporten?.sidecar?.enabled ? 'idporten' : spec.azure?.sidecar?.enabled ? 'azure' : null,
    }
}

function createAppMetadataForEnv(
    naiserators: (NaisApplication | NaisOther | NaisTopic)[],
    [env, filename, repoUrl]: GithubDeducedEnvironmentNaisFileTuple,
): AppMetadata | TopicMetadata | null {
    const naisApp =
        naiserators.find((app) => filename === app.filename) ??
        raise(`Unable to find naiserator '${filename}' (${env}) in ${naiserators.length} nais-files`)

    if (naisApp.type === 'other') {
        console.info(`Seems like ${filename} is some other nais resource (kind: ${naisApp.kind}), ignoring`)
        return null
    }

    if (naisApp.type === 'topic') {
        return {
            type: 'topic',
            topic: naisApp.topic.metadata.name,
            namespace: naisApp.topic.metadata.namespace,
            dependencies: createTopicDependencies(naisApp.topic.spec),
            fileUrl: `${repoUrl}/tree/main/${filename}`,
        } satisfies TopicMetadata
    }

    // Must be an application
    const { application } = naisApp
    return {
        type: 'app',
        app: application.metadata.name,
        namespace: application.metadata.namespace,
        ingress: createIngressMetadata(application.spec),
        databases:
            application.spec.gcp?.sqlInstances?.map((it) => ({
                name: it.name ?? application.metadata.name,
                databases: it.databases?.map((db) => db.name) ?? [],
            })) ?? null,
        repoUrl,
        dependencies: createApplicationDependencies(application.spec.accessPolicy),
    } satisfies AppMetadata
}

function createTopicDependencies(spec: NaisTopicSchema['spec']) {
    const toTopicDependency = (it: (typeof spec)['acl'][number]) =>
        ({ application: it.application, namespace: it.team }) satisfies TopicDependency

    return {
        readwrite: spec.acl.filter((it) => it.access === 'readwrite').map(toTopicDependency) ?? [],
        read: spec.acl.filter((it) => it.access === 'read').map(toTopicDependency) ?? [],
        write: spec.acl.filter((it) => it.access === 'write').map(toTopicDependency) ?? [],
    }
}

function createApplicationDependencies(accessPolicy: NaisSchema['spec']['accessPolicy']): AppMetadata['dependencies'] {
    return {
        inbound: accessPolicy?.inbound?.rules ?? [],
        outbound: accessPolicy?.outbound?.rules ?? [],
        external:
            accessPolicy?.outbound?.external?.map((it) => ({
                host: it.host ?? raise('Hostless external dependency'),
            })) ?? [],
    }
}
