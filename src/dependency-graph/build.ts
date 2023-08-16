import fs from 'node:fs'
import path from 'node:path'
import { gitOutputDir } from '../git/git.ts'

import { analyzeApp } from './analyze.ts'
import { AppMetadata } from './types.ts'

type DependencyGraphEnvironment = {
    applications: AppMetadata[]
}

type DependencyGraphResult = {
    'dev-gcp': DependencyGraphEnvironment
    'prod-gcp': DependencyGraphEnvironment
    'dev-fss': DependencyGraphEnvironment
    'prod-fss': DependencyGraphEnvironment
}

export async function buildDependencyGraph({ cache }: { cache: boolean }): Promise<DependencyGraphResult> {
    if (cache) {
        const bunFile = Bun.file(path.join(gitOutputDir, 'graph.json'))

        if (!(await bunFile.exists())) {
            console.error('Cache metadata does not exist, run without --cache flag first')
            process.exit(1)
        }

        console.info('Using cached dependency graph')
        return await bunFile.json<DependencyGraphResult>()
    }

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

    await Bun.write(path.join(gitOutputDir, 'graph.json'), JSON.stringify(result, null, 2))

    return result
}

function getAppsForEnv(cluster: string, appTuples: FlatArray<Awaited<Array<readonly [any, any]>>[], 1>[]) {
    return appTuples.filter(([env]) => env === cluster).map(([, metadata]) => metadata)
}
