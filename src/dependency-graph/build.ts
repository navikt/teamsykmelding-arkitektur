import { gitOutputDir } from '../git/git.ts'
import path from 'node:path'
import * as fs from 'node:fs'
import { glob } from 'glob'
import { parseYaml } from './yaml/parser.ts'
import { DepedencyNodeMetadata, Metadata, NaiseratorMetadata, NodeDependencies } from './types.ts'
import { notNull } from '../utils.ts'
import { getApplicationName, getEnvironments, getMetadataForEnvironment } from './metadata.ts'

export async function buildDependencyGraph({ cache }: { cache: boolean }): Promise<void> {
    const folders = await fs.promises.readdir(gitOutputDir)

    // broken: 6, 8, 12
    // demo apps: 9
    const folder = folders[14]
    console.log(folder)
    const result = await extractMetadata(path.join(gitOutputDir, folder))
    console.log(result)
}

async function extractMetadata(repoDir: string): Promise<DepedencyNodeMetadata | null> {
    if (!(await fs.promises.exists(repoDir))) {
        throw new Error(`Unable to find repo ${repoDir}`)
    }

    const relevantFiles = await glob(path.join(repoDir, '**/**/*.y*ml'), {
        dot: true,
        ignore: ['**/.yarn/**', '**/.yarnrc.yml'],
    })
    console.log(relevantFiles);
    const parsedYamls = await Promise.all(relevantFiles.map(parseYaml))
    const parsedMetadata: Metadata[] = parsedYamls.filter(notNull)

    try {
        return buildMetadata(parsedMetadata)
    } catch (e) {
        console.error(new Error(`Unable to build metadata for ${repoDir}`, { cause: e }))
        throw e
    }
}

function buildMetadata(parsedMetadata: Metadata[]): DepedencyNodeMetadata | null {
    const environments = getEnvironments(parsedMetadata)
    const applicationName = getApplicationName(parsedMetadata)

    if (!applicationName) {
        return null
    }

    return {
        application: applicationName,
        environments: environments.map(([env, naiserator]) => ({
            env: env,
            dependencies: getDependencies(getMetadataForEnvironment(parsedMetadata, naiserator)),
        })),
    }
}

function getDependencies(metadata: NaiseratorMetadata): NodeDependencies {
    return { inbound: metadata.inbound, outbound: metadata.outbound, external: metadata.external }
}
