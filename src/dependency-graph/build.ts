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

    console.log(await extractMetadata(path.join(gitOutputDir, folders[1])))
}

async function extractMetadata(repoDir: string): Promise<DepedencyNodeMetadata> {
    if (!(await fs.promises.exists(repoDir))) {
        throw new Error(`Unable to find repo ${repoDir}`)
    }

    const relevantFiles = await glob(path.join(repoDir, '**/**/*.y*ml'), { dot: true })
    const parsedMetadata: Metadata[] = (await Promise.all(relevantFiles.map(parseYaml))).filter(notNull)

    return buildMetadata(parsedMetadata)
}

function buildMetadata(parsedMetadata: Metadata[]): DepedencyNodeMetadata {
    const environments = getEnvironments(parsedMetadata)

    return {
        application: getApplicationName(parsedMetadata),
        environments: environments.map(([env, naiserator]) => ({
            env: env,
            dependencies: getDependencies(getMetadataForEnvironment(parsedMetadata, naiserator)),
        })),
    }
}

function getDependencies(metadata: NaiseratorMetadata): NodeDependencies {
    return { inbound: metadata.inbound, outbound: metadata.outbound, external: metadata.external }
}
