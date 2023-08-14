import { GithubWorkflowMetadata, Metadata, NaiseratorMetadata } from './types.ts'

export function getApplicationName(metadata: Metadata[]): string | null {
    const names = new Set(metadata.filter(naiseratorMetadata).map((nais) => nais.name))
    if (names.size === 0) {
        console.log(
            "Looks like this repo doesn't have any naiserator metadata, only github workflows, probably a naisjob",
        )
        return null
    } else if (names.size !== 1) {
        console.error('Wonky metadata:', metadata)
        throw new Error(`Expected exactly one application name, got ${names.size}`)
    }

    return names.values().next().value
}

export function getEnvironments(metadata: Metadata[]): [env: string, naiserator: string][] {
    const firstWorkflow = metadata.filter(githubWorkflowMetadata).find((workflow) => {
        return workflow.environments.length > 0
    })

    if (!firstWorkflow) {
        throw new Error(`Unable to find any workflows with environments`)
    }

    return firstWorkflow.environments.map((it, index) => [it, firstWorkflow.naiserators[0]])
}

export function getMetadataForEnvironment(parsedMetadata: Metadata[], naiserator: string) {
    const metadata = parsedMetadata.filter(naiseratorMetadata).find((it) => it.file.includes(naiserator))

    if (!metadata) {
        throw new Error(`Unable to find metadata for ${naiserator}`)
    }

    return metadata
}

export function naiseratorMetadata(metadata: Metadata): metadata is NaiseratorMetadata {
    return 'name' in metadata
}

function githubWorkflowMetadata(metadata: Metadata): metadata is GithubWorkflowMetadata {
    return 'environments' in metadata
}
