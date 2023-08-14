import { getRepositories } from './github/repos'
import { cloneOrPull } from './git/cloner'

const repositories = await getRepositories('teamsykmelding')

for (const repo of repositories) {
    await cloneOrPull(repo)
}
