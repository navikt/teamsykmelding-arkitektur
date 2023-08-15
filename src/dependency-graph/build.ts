import * as R from 'remeda'
import { gitOutputDir } from '../git/git.ts'
import path from 'node:path'
import * as fs from 'node:fs'
import { parseYaml } from './yaml/parser.ts'
import { DepedencyNodeMetadata, Metadata, NaiseratorMetadata, NodeDependencies } from './types.ts'
import { notNull } from '../utils.ts'
import { getApplicationName, getEnvironments, getMetadataForEnvironment } from './metadata.ts'
import { globDirForYaml } from './yaml/globber.ts'

const appNameMapping: Record<string, string> = {
    teamsykmelding: 'teamsykmelding-website',
}

export async function buildDependencyGraph({ cache }: { cache: boolean }): Promise<DepedencyNodeMetadata[]> {
    if (!cache) {
        const folders = await fs.promises.readdir(gitOutputDir)

        const all = (
            await Promise.all(
                folders.map(
                    async (folder) =>
                        await extractMetadata(path.join(gitOutputDir, folder), appNameMapping[folder] ?? folder),
                ),
            )
        )
            .flat()
            .filter(notNull)

        await Bun.write(path.join(gitOutputDir, 'graph.json'), JSON.stringify(all, null, 2))

        return all
    } else {
        // generate mermaid using cache
        const bunFile = Bun.file(path.join(gitOutputDir, 'graph.json'))

        if (!(await bunFile.exists())) {
            console.error('Cache metadata does not exist, run without --cache flag first')
            process.exit(1)
        }

        return await bunFile.json<DepedencyNodeMetadata[]>()
    }
}

async function extractMetadata(repoDir: string, appName: string): Promise<DepedencyNodeMetadata[] | null> {
    if (!(await fs.promises.exists(repoDir))) {
        throw new Error(`Unable to find repo ${repoDir}`)
    }

    const relevantFiles = await globDirForYaml(repoDir)
    const parsedMetadata = (await Promise.all(relevantFiles.map((it) => parseYaml(it, appName)))).flat().filter(notNull)

    if (parsedMetadata.length === 0) {
        console.debug(`${repoDir.split('/').slice(-1)} doesn't look like an app that deploys`)
        return null
    }

    const metadataPerApp = R.groupBy(parsedMetadata, (it) => it.application)

    try {
        return Object.values(metadataPerApp).map(buildMetadata).filter(notNull)
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
        environments: environments
            .map(([env, naiserator]) => {
                const metadataForEnvironment = getMetadataForEnvironment(parsedMetadata, naiserator)

                if (!metadataForEnvironment) return null

                return {
                    env: env,
                    dependencies: getDependencies(metadataForEnvironment),
                }
            })
            .filter(notNull),
    }
}

function getDependencies(metadata: NaiseratorMetadata): NodeDependencies {
    return { inbound: metadata.inbound, outbound: metadata.outbound, external: metadata.external }
}
