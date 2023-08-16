import { GithubActionsSchema, NormalJob } from '../dependency-graph/yaml/schemas/gha-schema.ts'
import { notNull, raise } from '../utils.ts'

export type EnvironmentNaisFileTuple = [environment: string, naisFile: string]

export function getEnvironmentNaisTuple(file: GithubActionsSchema): EnvironmentNaisFileTuple[] | null {
    const jobKeys = Object.keys(file.jobs)
    const firstJob = file.jobs[jobKeys[0]]
    if ('uses' in firstJob && firstJob?.uses?.includes('teamsykmelding-github-actions-workflows')) {
        if (firstJob.uses.includes('next-app')) {
            return [
                ['dev-gcp', 'nais-dev.yaml'],
                ['prod-gcp', 'nais-prod.yaml'],
            ]
        }

        if (firstJob.uses.includes('redis.yaml')) {
            return [
                ['dev-gcp', 'redis.yaml'],
                ['prod-gcp', 'redis.yaml'],
            ]
        }

        if (firstJob.uses.includes('jar-app.yaml')) {
            return [
                ['dev-gcp', 'naiserator-dev.yaml'],
                ['prod-gcp', 'naiserator-prod.yaml'],
            ]
        }

        raise(`Unknown shared workflow: ${firstJob.uses}`)
    }

    const naisJobs: [env: string, naiserator: string][] = Object.values(file.jobs)
        .filter((job): job is NormalJob => 'runs-on' in job)
        .filter((job) => job.steps?.filter((step) => step.uses?.startsWith('nais/deploy/actions/deploy')))
        .flatMap(
            (job) =>
                job.steps
                    ?.filter((step) => step.uses?.startsWith('nais/deploy/actions/deploy'))
                    .map((step) => {
                        if (typeof step.env === 'string') raise('Expected env to be an object')

                        return [
                            step.env?.['CLUSTER'] ?? raise('Missing CLUSTER property'),
                            step.env?.['RESOURCE'] ?? raise('Missing RESOURCE propertry'),
                        ] as [string, string]
                    }),
        )
        .filter(notNull)
        .map(([env, resource]) => [
            env,
            resource.split('/').at(-1) ?? raise(`Weird format on resource name: ${resource}`),
        ])

    if (!naisJobs.length) {
        return null
    }

    return naisJobs
}
