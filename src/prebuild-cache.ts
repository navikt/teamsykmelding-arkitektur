import { getRepositories } from './github/repos.ts'
import { cloneOrPull, updateCacheMetadata } from './git/cloner.ts'
import { buildDependencyGraph } from './dependency-graph/build.ts'

console.info('Pre-loading git repositories')

const repositories = await getRepositories('teamsykmelding')
await Promise.all(repositories.map(cloneOrPull))
await updateCacheMetadata()

await buildDependencyGraph({ cache: false })
