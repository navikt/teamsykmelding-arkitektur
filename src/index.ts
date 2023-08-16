import { getRepositories } from './github/repos'
import { cloneOrPull, readCacheMetadata, updateCacheMetadata } from './git/cloner'
import { buildDependencyGraph } from './dependency-graph/build.ts'
import { buildMermaid } from './mermaid/build.ts'
import { writeMermaid } from './mermaid/write.ts'
import { buildDependencyGraphV2 } from './dependency-graph-v2/build.ts'

const gitArg = Bun.argv.includes('--git')
const cacheArg = Bun.argv.includes('--cache')
const v2 = Bun.argv.includes('--v2')

if (gitArg) {
    console.info('--git flag found, cloning or pulling repositories')

    const repositories = await getRepositories('teamsykmelding')

    await Promise.all(repositories.map(cloneOrPull))
    await updateCacheMetadata()
} else {
    const metadata = await readCacheMetadata()

    console.info(`Not fetching git, last updated ${new Date(metadata.timestamp).toISOString()}`)
}

if (v2) {
    console.info('Using v2')
    await buildDependencyGraphV2()
} else {
    const dependencyGraph = await buildDependencyGraph({ cache: cacheArg })
    const mermaid = buildMermaid(dependencyGraph)

    await writeMermaid(mermaid, 'graph.md')
}
