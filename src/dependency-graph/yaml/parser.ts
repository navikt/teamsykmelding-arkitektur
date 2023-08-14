import { load } from 'js-yaml'

import { GithubWorkflowMetadata, Metadata, NaiseratorMetadata } from '../types.ts'
import { GithubActionsSchema, NormalJob } from './schemas/gha-schema.ts'
import { NaisSchema } from './schemas/nais-schema.ts'
import { notNull, raise } from '../../utils.ts'

export async function parseYaml(yamlPath: string): Promise<Metadata | null> {
    const content = await Bun.file(yamlPath).text()
    const yaml: any = load(content)

    if ('apiVersion' in yaml && yaml.kind === 'Application') {
        return extractNaiseratorMetadata(yaml, yamlPath.split('/').slice(-1))
    } else if ('jobs' in yaml) {
        return extractGithubWorkflowMetadata(yaml)
    } else {
        console.debug(`Not naiserator or workflow: ${yamlPath.split('/').slice(-1)}`)
        return null
    }
}

function extractGithubWorkflowMetadata(yaml: GithubActionsSchema): GithubWorkflowMetadata {
    const jobKeys = Object.keys(yaml.jobs)
    const firstJob = yaml.jobs[jobKeys[0]]
    if ('uses' in firstJob && firstJob?.uses?.includes('teamsykmelding-github-actions-workflows')) {
        return {
            environments: ['dev-gcp', 'prod-gcp'],
            naiserators: ['naiserator-dev.yaml', 'naiserator-prod.yaml'],
            isSharedWorkflow: true,
        }
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

    return {
        environments: naisJobs.map(([env, _]) => env),
        naiserators: naisJobs.map(([_, naiserator]) => naiserator),
        isSharedWorkflow: false,
    }
}

function extractNaiseratorMetadata(yaml: NaisSchema, file: any): NaiseratorMetadata {
    return {
        file: file,
        name: yaml.metadata.name,
        namespace: yaml.metadata.namespace,
        inbound: yaml.spec.accessPolicy?.inbound?.rules ?? [],
        outbound: yaml.spec.accessPolicy?.outbound?.rules ?? [],
        external: (yaml.spec.accessPolicy?.outbound?.external ?? []) as unknown as NaiseratorMetadata['external'],
    }
}
