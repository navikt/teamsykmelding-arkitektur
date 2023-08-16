import { GithubActionsSchema, NormalJob } from './yaml/schemas/gha-schema.ts'
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
        .flatMap(extractClusterResourcesTuple(file.env))
        .filter(notNull)
        .flatMap(([env, resource]) => resource.split(',').map((it) => [env, it] as [string, string]))

    if (!naisJobs.length) {
        return null
    }

    return naisJobs.map(([env, resource]) => [
        env,
        resource.split('/').at(-1) ?? raise(`Weird format on resource name: ${resource}`),
    ])
}

function extractClusterResourcesTuple(env: Record<string, string | number | boolean> | string | undefined) {
    return (job: NormalJob): [string, string][] | null =>
        job.steps
            ?.filter((step) => step.uses?.startsWith('nais/deploy/actions/deploy'))
            .map((step) => {
                if (typeof step.env === 'string') raise('Expected env to be an object')

                const resource = getResourceWithEnvReplace(step.env, env)

                return [step.env?.['CLUSTER'] ?? raise('Missing CLUSTER property'), resource] as [string, string]
            }) ?? null
}

function getResourceWithEnvReplace(
    stepEnv: Record<string, string | number | boolean> | undefined,
    env: Record<string, string | number | boolean> | string | undefined,
): string {
    const resource: string = `${stepEnv?.['RESOURCE'] ?? raise('Missing RESOURCE propertry')}`

    if (resource.includes('$')) {
        if (env == null || typeof env === 'string') {
            raise(`Expected env to be an object, but was ${typeof env}`)
        }

        const [, value] =
            Object.entries(env).find(([key]) => resource.includes(key)) ?? raise(`No env to replace ${resource} with`)

        return value as string
    }

    return resource
}
