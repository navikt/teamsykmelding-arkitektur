import * as R from 'remeda'
import path from 'node:path'
import fs from 'node:fs'

import { notNull, raise } from '../utils.ts'
import { gitOutputDir } from '../git/git.ts'

import { GithubActionsSchema } from './yaml/schemas/gha-schema.ts'
import { NaisSchemaTuple, parseYaml, WorkingFiles } from './yaml/parser.ts'
import { globDirForYaml } from './yaml/globber.ts'
import { EnvironmentNaisFileTuple, getEnvironmentNaisTuple } from './github.ts'
import { NaisSchema } from './yaml/schemas/nais-schema.ts'
import { AppMetadata, IngressMetadata } from './types.ts'
import { randomUUID } from 'crypto'

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
    const naiserators = relevantFiles.filter((it): it is NaisSchemaTuple => Array.isArray(it))
    const githubWorkflows = relevantFiles.filter((it): it is GithubActionsSchema => 'jobs' in it)
    const environments = githubWorkflows.map(getEnvironmentNaisTuple).filter(notNull).flat()

    const environmentMetadataTuples = R.pipe(
        environments,
        R.map((env) => [env[0], createAppMetadataForEnv(naiserators, env)]),
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
    naiserators: NaisSchemaTuple[],
    [env, filename]: EnvironmentNaisFileTuple,
): AppMetadata | null {
    const [, file] =
        naiserators.find(([naisFilename]) => filename === naisFilename) ??
        raise(`Unable to find naiserator '${filename}' (${env})`)

    if (file == null) {
        console.info(`Seems like ${filename} is some other nais resource, ignoring`)
        return null
    }

    return {
        app: file.metadata.name,
        namespace: file.metadata.namespace,
        ingress: createIngressMetadata(file.spec),
        databases:
            file.spec.gcp?.sqlInstances?.map((it) => ({
                name: it.name ?? file.metadata.name,
                databases: it.databases?.map((db) => db.name) ?? [],
            })) ?? null,
        dependencies: createApplicationDependencies(file.spec.accessPolicy),
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
