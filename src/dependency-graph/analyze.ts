import * as R from 'remeda'
import path from 'node:path'
import fs from 'node:fs'

import { notNull, raise } from '../utils.ts'
import { gitOutputDir } from '../git/git.ts'

import { GithubAction, NaisApplication, NaisOther, NaisTopic, parseYaml, WorkingFiles } from './yaml/parser.ts'
import { globDirForYaml } from './yaml/globber.ts'
import { EnvironmentNaisFileTuple, getEnvironmentNaisTuple } from './github.ts'
import { NaisSchema } from './yaml/schemas/nais-schema.ts'
import { AppMetadata, IngressMetadata, TopicMetadata } from './types.ts'

export async function analyzeApp(repoDir: string): Promise<[string, AppMetadata | TopicMetadata][]> {
    const dir = path.join(gitOutputDir, repoDir)

    if (!(await fs.promises.exists(dir))) {
        throw new Error(`Unable to find repo ${dir}`)
    }

    // All nais and GitHub workflow yamls, other files should be ignored during the parsing step
    const relevantFiles = (await globDirForYaml(dir)).filter((it) => !it.includes('demo'))
    // All files are parsed into memory once
    const files = (await Promise.all(relevantFiles.map(parseYaml))).flat().filter(notNull)

    // Each GitHub workflow is parsed, extracts the corresponding nais file and the environment it is deployed to
    return createApplicationMetadata(files)
}

function createApplicationMetadata(relevantFiles: WorkingFiles[]): [string, AppMetadata | TopicMetadata][] {
    const napsApps = relevantFiles.filter((it): it is NaisApplication => it.type === 'app')
    const naisTopics = relevantFiles.filter((it): it is NaisTopic => it.type === 'topic')
    const naisJobs = relevantFiles.filter((it): it is NaisOther => it.type === 'other')
    const githubWorkflows = relevantFiles.filter((it): it is GithubAction => it.type === 'action')
    const environments = githubWorkflows
        .map((it) => it.action)
        .map(getEnvironmentNaisTuple)
        .filter(notNull)
        .flat()

    return R.pipe(
        environments,
        R.map((env) => [env[0], createAppMetadataForEnv([...napsApps, ...naisJobs, ...naisTopics], env)]),
        R.filter((tuple): tuple is [string, AppMetadata | TopicMetadata] => tuple[1] != null),
        R.uniqBy(([env, metadata]) =>
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
    [env, filename]: EnvironmentNaisFileTuple,
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
        } satisfies TopicMetadata
    }

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
        dependencies: createApplicationDependencies(application.spec.accessPolicy),
    } satisfies AppMetadata
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