import * as R from 'remeda'
import { load } from 'js-yaml'

import { GithubWorkflowMetadata, Metadata, NaiseratorMetadata } from '../types.ts'
import { GithubActionsSchema, NormalJob } from './schemas/gha-schema.ts'
import { NaisSchema } from './schemas/nais-schema.ts'
import { notNull, raise } from '../../utils.ts'

export async function parseYaml(yamlPath: string, appName: string): Promise<Metadata[]> {
    const content = await Bun.file(yamlPath).text()

    const parsedResult = await Promise.all(
        R.compact(content.split('---')).map((it) => parseYamlContent(it, yamlPath, appName)),
    )

    return parsedResult.filter(notNull)
}

async function parseYamlContent(content: string, yamlPath: string, appName: string): Promise<Metadata | null> {
    let yaml: any = null
    try {
        yaml = load(content.replace('{{appname}}', '<app>'))

        if ('apiVersion' in yaml && yaml.kind === 'Application') {
            return extractNaiseratorMetadata(yaml, yamlPath.split('/').slice(-1))
        } else if ('jobs' in yaml) {
            return extractGithubWorkflowMetadata(yaml, appName)
        } else {
            console.debug(`Not naiserator or workflow: ${yamlPath.split('/').slice(-4).join('/')}`)
            return null
        }
    } catch (e) {
        console.error('error', yamlPath, e)
        throw new Error(`Unable to parse ${yamlPath}`, { cause: e })
    }
}

function extractGithubWorkflowMetadata(yaml: GithubActionsSchema, appName: string): GithubWorkflowMetadata | null {
    const jobKeys = Object.keys(yaml.jobs)
    const firstJob = yaml.jobs[jobKeys[0]]
    if ('uses' in firstJob && firstJob?.uses?.includes('teamsykmelding-github-actions-workflows')) {
        if (firstJob.uses.includes('next-app')) {
            return {
                application:
                    typeof firstJob.with === 'object'
                        ? firstJob.with?.['app']?.toString() ?? raise('Reusable next-app workflow missing app name')
                        : raise('Reusable next-app has no "with" object'),
                environments: ['dev-gcp', 'prod-gcp'],
                naiserators: ['nais-dev.yaml', 'nais-prod.yaml'],
                isSharedWorkflow: true,
            }
        }

        if (firstJob.uses.includes('redis.yaml')) {
            return {
                application: `${appName}-redis`,
                environments: ['dev-gcp', 'prod-gcp'],
                naiserators: ['redis.yaml', 'redis.yaml'],
                isSharedWorkflow: true,
            }
        }

        if (firstJob.uses.includes('jar-app.yaml')) {
            return {
                application:
                    typeof firstJob.with === 'object'
                        ? firstJob.with?.['app']?.toString() ?? raise('Reusable next-app workflow missing app name')
                        : raise('Reusable next-app has no "with" object'),
                environments: ['dev-gcp', 'prod-gcp'],
                naiserators: ['naiserator-dev.yaml', 'naiserator-prod.yaml'],
                isSharedWorkflow: true,
            }
        }

        raise(`Unknown shared workflow: ${firstJob.uses}`)
    }

    const naisJobs: [env: string, naiserator: string][] = Object.values(yaml.jobs)
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

    if (!naisJobs.length) {
        return null
    }

    return {
        application: appName,
        environments: naisJobs.map(([env, _]) => env),
        naiserators: naisJobs.map(([_, naiserator]) => naiserator.split('/').slice(-1)[0]),
        isSharedWorkflow: false,
    }
}

function extractNaiseratorMetadata(yaml: NaisSchema, file: any): NaiseratorMetadata | null {
    if (yaml.metadata.name.includes('demo')) return null

    return {
        file: file,
        application: yaml.metadata.name,
        namespace: yaml.metadata.namespace,
        inbound: yaml.spec.accessPolicy?.inbound?.rules ?? [],
        outbound: yaml.spec.accessPolicy?.outbound?.rules ?? [],
        external: (yaml.spec.accessPolicy?.outbound?.external ?? []) as unknown as NaiseratorMetadata['external'],
    }
}
