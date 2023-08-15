export type NodeDependencies = {
    inbound: any[]
    outbound: any[]
    external: any[]
}

export type DepedencyNodeMetadata = {
    application: string
    environments: {
        env: string
        dependencies: NodeDependencies
    }[]
}

export type GithubWorkflowMetadata = {
    application: string
    environments: string[]
    naiserators: string[]
    isSharedWorkflow: boolean
}

export type NaiseratorMetadata = {
    application: string
    file: string
    namespace: string
    inbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
    outbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
    external: { host: string }[]
}

export type Metadata = GithubWorkflowMetadata | NaiseratorMetadata
