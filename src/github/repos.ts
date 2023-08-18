import { octokit } from './octokit'

const blacklist = [
    'vault-iac',
    'aad-iac',
    'syfo-generator-ktor',
    // Has a lot of workflows that confuses the parsing
    'teamsykmelding-github-actions-workflows',
    // This repo
    'teamsykmelding-arkitektur',
]

const teamReposQuery = /* GraphQL */ `
    query OurRepos {
        organization(login: "navikt") {
            team(slug: "teamsykmelding") {
                repositories {
                    nodes {
                        name
                        isArchived
                    }
                }
            }
        }
    }
`

export async function getRepositories(team: string): Promise<string[]> {
    if (Bun.env.GH_TOKEN == null) {
        console.error('GH_TOKEN not set')
        process.exit(1)
    }

    console.info(`Getting repositories for team ${team}`)

    const repoes = ((await octokit.graphql(teamReposQuery)) as any).organization.team.repositories.nodes
        .filter((repo: any) => !repo.isArchived)
        .map((repo: any) => repo.name)
        .filter((repo: string) => !blacklist.includes(repo))

    console.info(`Got ${repoes.length} repositories for team ${team}`)

    return repoes
}
