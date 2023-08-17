import { getRepositories } from './github/repos'
import { cloneOrPull, readCacheMetadata, updateCacheMetadata } from './git/cloner'
import { buildMermaid } from './mermaid/build.ts'
import { writeMermaid } from './mermaid/write.ts'
import { buildDependencyGraph } from './dependency-graph/build.ts'
import server from './server'

const gitArg = Bun.argv.includes('--git')
const cacheArg = Bun.argv.includes('--cache')

if (gitArg) {
    console.info('--git flag found, cloning or pulling repositories')

    const repositories = await getRepositories('teamsykmelding')

    await Promise.all(repositories.map(cloneOrPull))
    await updateCacheMetadata()
} else {
    const metadata = await readCacheMetadata()

    console.info(`Not fetching git, last updated ${new Date(metadata.timestamp).toISOString()}`)
}

const dependencyGraph = await buildDependencyGraph({ cache: cacheArg })
const mermaid = buildMermaid(dependencyGraph['prod-gcp'])

await writeMermaid(mermaid, 'graph.md')

export default server
