import * as R from 'remeda'
import path from 'node:path'
import fs from 'node:fs'

import { notNull, raise } from '../utils.ts'
import { gitOutputDir } from '../git/git.ts'

import { NaisApplication, GithubAction, parseYaml, WorkingFiles, NaisOther, NaisTopic } from './yaml/parser.ts'
import { globDirForYaml } from './yaml/globber.ts'
import { EnvironmentNaisFileTuple, getEnvironmentNaisTuple } from './github.ts'
import { NaisSchema } from './yaml/schemas/nais-schema.ts'
import { AppMetadata, IngressMetadata } from './types.ts'

export async function analyzeApp(repoDir: string) {
    const dir = path.join(gitOutputDir, repoDir)

    if (!(await fs.promises.exists(dir))) {
        throw new Error(`Unable to find repo ${dir}`)
    }

    // All nais and github workflow yamls, other files should be ignored during the parsing step
    const relevantFiles = (await globDirForYaml(dir)).filter((it) => !it.includes('demo'))
    // All files are parsed into memory once
    const files = (await Promise.all(relevantFiles.map(parseYaml))).flat().filter(notNull)

    // Each github workflow is parsed, extracts the corresponding nais file and the environment it is deployed to
    const applicationMetadataPerEnv = createApplicationMetadata(files)

    return applicationMetadataPerEnv
}

function createApplicationMetadata(relevantFiles: WorkingFiles[]) {
    const napsApps = relevantFiles.filter((it): it is NaisApplication => it.type === 'app')
    const naisTopics = relevantFiles.filter((it): it is NaisTopic => it.type === 'topic')
    const naisJobs = relevantFiles.filter((it): it is NaisOther => it.type === 'other')
    const githubWorkflows = relevantFiles.filter((it): it is GithubAction => it.type === 'action')
    const environments = githubWorkflows
        .map((it) => it.action)
        .map(getEnvironmentNaisTuple)
        .filter(notNull)
        .flat()

    const environmentMetadataTuples = R.pipe(
        environments,
        R.map((env) => [env[0], createAppMetadataForEnv([...napsApps, ...naisJobs, ...naisTopics], env)]),
        R.filter((tuple): tuple is [string, AppMetadata] => tuple[1] != null),
        R.uniqBy(([env, metadata]) => `${metadata.namespace}-${env}-${metadata.app}`),
    )

    return environmentMetadataTuples
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
): AppMetadata | null {
    const naisApp =
        naiserators.find((app) => filename === app.filename) ??
        raise(`Unable to find naiserator '${filename}' (${env}) in ${naiserators.length} nais-files`)

    if (naisApp.type === 'other') {
        console.info(`Seems like ${filename} is some other nais resource (kind: ${naisApp.kind}), ignoring`)
        return null
    }

    if (naisApp.type === 'topic') {
        console.info(`Seems like ${filename} is a topic, ignoring`)
        return null
    }

    const { application } = naisApp

    return {
        app: application.metadata.name,
        namespace: application.metadata.namespace,
        ingress: createIngressMetadata(application.spec),
        databases:
            application.spec.gcp?.sqlInstances?.map((it) => ({
                name: it.name ?? application.metadata.name,
                databases: it.databases?.map((db) => db.name) ?? [],
            })) ?? null,
        dependencies: createApplicationDependencies(application.spec.accessPolicy),
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
