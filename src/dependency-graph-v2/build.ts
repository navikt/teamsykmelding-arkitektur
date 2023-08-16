import fs from 'node:fs'
import * as R from 'remeda'
import { gitOutputDir } from '../git/git.ts'
import { globDirForYaml } from '../dependency-graph/yaml/globber.ts'
import path from 'node:path'
import { NaisSchemaTuple, parseYaml, WorkingFiles } from './yaml/parser.ts'
import { notNull, raise } from '../utils.ts'
import { GithubActionsSchema } from '../dependency-graph/yaml/schemas/gha-schema.ts'
import { EnvironmentNaisFileTuple, getEnvironmentNaisTuple } from './github.ts'
import { NaisSchema } from '../dependency-graph/yaml/schemas/nais-schema.ts'

type DependencyGraphEnvironment = {
    applications: {}[]
}

type DependencyGraphResult = {
    'dev-gcp': DependencyGraphEnvironment
    'prod-gcp': DependencyGraphEnvironment
    'dev-fss': DependencyGraphEnvironment
    'prod-fss': DependencyGraphEnvironment
}

export async function buildDependencyGraphV2(): Promise<DependencyGraphResult> {
    const folders = await fs.promises.readdir(gitOutputDir)

    const appTuples = (await Promise.all(folders.filter((it) => it !== 'teamsykmelding-kafka-topics').map(analyzeApp)))
        .filter((it) => it.length > 0)
        .flat()

    const result: DependencyGraphResult = {
        'dev-gcp': {
            applications: getAppsForEnv('dev-gcp', appTuples),
        },
        'prod-gcp': {
            applications: getAppsForEnv('prod-gcp', appTuples),
        },
        'dev-fss': {
            applications: getAppsForEnv('dev-fss', appTuples),
        },
        'prod-fss': {
            applications: getAppsForEnv('prod-fss', appTuples),
        },
    }

    await Bun.write(path.join(gitOutputDir, 'graph_2.json'), JSON.stringify(result, null, 2))

    return {}
}

async function analyzeApp(repoDir: string) {
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

function getAppsForEnv(cluster: string, appTuples: FlatArray<Awaited<Array<readonly [any, any]>>[], 1>[]) {
    return appTuples.filter(([env]) => env === cluster).map(([, metadata]) => metadata)
}

type AppMetadata = {
    app: string
    namespace: string
    ingress: string | null
    dependencies: {
        inbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
        outbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
        external: { host: string }[]
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
        ingress: file.spec.ingresses?.at(0) ?? null,
        dependencies: createApplicationDependencies(file.spec.accessPolicy),
        // other: file.spec.ingresses
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
