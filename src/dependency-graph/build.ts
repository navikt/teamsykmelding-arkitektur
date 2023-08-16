import fs from 'node:fs'
import path from 'node:path'
import { gitOutputDir } from '../git/git.ts'

import { analyzeApp } from './analyze.ts'
import { AppMetadata, DependencyGraphResult, TopicMetadata } from './types.ts'
import { partition } from 'remeda'

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
    const envToMetadataTuples: [string, AppMetadata | TopicMetadata][] = (await Promise.all(folders.map(analyzeApp)))
        .filter((it) => it.length > 0)
        .flat()

    const result: DependencyGraphResult = {
        'dev-gcp': {
            applications: getForEnv('app', 'dev-gcp', envToMetadataTuples),
            topics: getForEnv('topic', 'dev-gcp', envToMetadataTuples),
        },
        'prod-gcp': {
            applications: getForEnv('app', 'prod-gcp', envToMetadataTuples),
            topics: getForEnv('topic', 'prod-gcp', envToMetadataTuples),
        },
        'dev-fss': {
            applications: getForEnv('app', 'dev-fss', envToMetadataTuples),
            topics: getForEnv('topic', 'dev-fss', envToMetadataTuples),
        },
        'prod-fss': {
            applications: getForEnv('app', 'prod-fss', envToMetadataTuples),
            topics: getForEnv('topic', 'prod-fss', envToMetadataTuples),
        },
    }

    await Bun.write(path.join(gitOutputDir, 'graph.json'), JSON.stringify(result, null, 2))

    return result
}

function getForEnv(what: 'app', cluster: string, appTuples: [string, AppMetadata | TopicMetadata][]): AppMetadata[]
function getForEnv(what: 'topic', cluster: string, appTuples: [string, AppMetadata | TopicMetadata][]): TopicMetadata[]
function getForEnv(what: 'app' | 'topic', cluster: string, appTuples: [string, AppMetadata | TopicMetadata][]) {
    return appTuples
        .filter(([, metadata]) => metadata.type === what)
        .filter(([env]) => env === cluster)
        .map(([, metadata]) => metadata)
}
