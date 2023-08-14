import { load } from 'js-yaml'

import { GithubWorkflowMetadata, Metadata, NaiseratorMetadata } from '../types.ts'

export async function parseYaml(yamlPath: string): Promise<Metadata | null> {
    const content = await Bun.file(yamlPath).text()
    const yaml: any = load(content)

    if ('apiVersion' in yaml) {
        return extractNaiseratorMetadata(yaml, yamlPath.split('/').slice(-1))
    } else if ('jobs' in yaml) {
        return extractGithubWorkflowMetadata(yaml)
    } else {
        console.debug(`Not naiserator or workflow: ${yamlPath.split('/').slice(-1)}`)
        return null
    }
}

function extractGithubWorkflowMetadata(yaml: any): GithubWorkflowMetadata {
    const jobKeys = Object.keys(yaml.jobs)
    if (yaml.jobs[jobKeys[0]]?.uses?.includes('teamsykmelding-github-actions-workflows')) {
        return {
            environments: ['dev-gcp', 'prod-gcp'],
            naiserators: ['naiserator-dev.yaml', 'naiserator-prod.yaml'],
            isSharedWorkflow: true,
        }
    }

    throw new Error('needs real mapping')
}

function extractNaiseratorMetadata(yaml: any, file: any): NaiseratorMetadata {
    return {
        file: file,
        name: yaml.metadata.name,
        namespace: yaml.metadata.namespace,
        inbound: yaml.spec.accessPolicy?.inbound?.rules ?? [],
        outbound: yaml.spec.accessPolicy?.outbound?.rules ?? [],
        external: yaml.spec.accessPolicy?.outbound?.external ?? [],
    }
}
