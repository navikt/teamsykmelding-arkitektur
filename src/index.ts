import { getRepositories } from './github/repos'
import { cloneOrPull, readCacheMetadata, updateCacheMetadata } from './git/cloner'
import { buildDependencyGraph } from './dependency-graph/build.ts'

if (Bun.argv.includes('--git')) {
    console.info('--git flag found, cloning or pulling repositories')

    const repositories = await getRepositories('teamsykmelding')

    await Promise.all(repositories.map(cloneOrPull))
    await updateCacheMetadata()
} else {
    const metadata = await readCacheMetadata()

    console.info(`Using cache last updated ${new Date(metadata.timestamp).toISOString()}`)
}

await buildDependencyGraph({ cache: true })
