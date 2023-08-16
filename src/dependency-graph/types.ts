export type DependencyGraphEnvironment = {
    applications: AppMetadata[]
    topics: TopicMetadata[]
}

export type DependencyGraphResult = {
    'dev-gcp': DependencyGraphEnvironment
    'prod-gcp': DependencyGraphEnvironment
    'dev-fss': DependencyGraphEnvironment
    'prod-fss': DependencyGraphEnvironment
}

export type DatabaseMetadata = { name: string; databases: string[] }

export type IngressMetadata = { ingress: string; wonderwall: 'azure' | 'idporten' | null }

export type AppMetadata = {
    type: 'app'
    app: string
    namespace: string
    ingress: IngressMetadata | null
    databases: DatabaseMetadata[] | null
    dependencies: {
        inbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
        outbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
        external: { host: string }[]
    }
}

export type TopicMetadata = {
    type: 'topic'
    topic: string
    namespace: string
}
