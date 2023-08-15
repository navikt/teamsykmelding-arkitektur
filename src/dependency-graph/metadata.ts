import * as R from 'remeda'

import { GithubWorkflowMetadata, Metadata, NaiseratorMetadata } from './types.ts'

export function getApplicationName(metadata: Metadata[]): string | null {
    const names = new Set(metadata.filter(naiseratorMetadata).map((nais) => nais.application))
    if (names.size === 0) {
        console.info(
            "Looks like this repo doesn't have any naiserator metadata, only github workflows, probably a naisjob",
        )
        return null
    } else if (names.size !== 1) {
        console.error('Wonky metadata:', metadata)
        throw new Error(`Expected exactly one application name, got ${names.size} (${Array.from(names).join(', ')})`)
    }

    return names.values().next().value
}

export function getEnvironments(metadata: Metadata[]): [env: string, naiserator: string][] {
    const allEnvironments: [env: string, naiserator: string][] = R.pipe(
        metadata,
        R.filter(githubWorkflowMetadata),
        R.flatMap((metadata) =>
            metadata.environments.map((it, index): [env: string, naiserator: string] => [
                it,
                metadata.naiserators[index],
            ]),
        ),
        R.uniqBy(([env, naiserator]) => `${env}-${naiserator}`),
    )

    if (!allEnvironments.length) {
        throw new Error(`Unable to find any workflows with environments`)
    }

    return allEnvironments
}

export function getMetadataForEnvironment(parsedMetadata: Metadata[], naiserator: string) {
    const metadata = parsedMetadata.filter(naiseratorMetadata).find((it) => it.file.includes(naiserator))

    if (!metadata) {
        console.debug(`Seems like ${naiserator} is not a naiserator file, maybe some other nais resource?`)
        return null
    }

    return metadata
}

export function naiseratorMetadata(metadata: Metadata): metadata is NaiseratorMetadata {
    return 'file' in metadata
}

function githubWorkflowMetadata(metadata: Metadata): metadata is GithubWorkflowMetadata {
    return 'environments' in metadata
}
