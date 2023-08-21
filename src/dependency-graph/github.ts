import { GithubActionsSchema, NormalJob } from './yaml/schemas/gha-schema.ts'
import { notNull, raise } from '../utils.ts'

export type GithubDeducedEnvironmentNaisFileTuple = [environment: string, naisFile: string, repoUrl: string]

export function getEnvironmentNaisTuple(
    file: GithubActionsSchema,
    repoUrl: string,
): GithubDeducedEnvironmentNaisFileTuple[] | null {
    const jobKeys = Object.keys(file.jobs)
    const firstJob = file.jobs[jobKeys[0]]
    if ('uses' in firstJob && firstJob?.uses?.includes('teamsykmelding-github-actions-workflows')) {
        if (firstJob.uses.includes('next-app')) {
            return [
                ['dev-gcp', 'nais/nais-dev.yaml', repoUrl],
                ['prod-gcp', 'nais/nais-prod.yaml', repoUrl],
            ]
        }

        if (firstJob.uses.includes('redis.yaml')) {
            return [
                ['dev-gcp', 'redis.yaml', repoUrl],
                ['prod-gcp', 'redis.yaml', repoUrl],
            ]
        }

        if (firstJob.uses.includes('jar-app.yaml')) {
            return [
                ['dev-gcp', 'naiserator-dev.yaml', repoUrl],
                ['prod-gcp', 'naiserator-prod.yaml', repoUrl],
            ]
        }

        raise(`Unknown shared workflow: ${firstJob.uses}`)
    }

    const naisJobs: GithubDeducedEnvironmentNaisFileTuple[] = Object.values(file.jobs)
        .filter((job): job is NormalJob => 'runs-on' in job)
        .filter((job) => job.steps?.filter((step) => step.uses?.startsWith('nais/deploy/actions/deploy')))
        .flatMap(extractClusterResourcesTuple(file.env))
        .filter(notNull)
        .flatMap(([env, resource]) =>
            resource.split(',').map((it): GithubDeducedEnvironmentNaisFileTuple => [env, it, repoUrl]),
        )

    if (!naisJobs.length) {
        return null
    }

    return naisJobs
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
