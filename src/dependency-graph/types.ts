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

export type AppDependency = { application: string; namespace: string; cluster: string }

export type InterTeamAppDependency = { application: string }

export type AppMetadata = {
    type: 'app'
    app: string
    namespace: string
    ingress: IngressMetadata | null
    databases: DatabaseMetadata[] | null
    repoUrl: string | null
    dependencies: {
        inbound: (InterTeamAppDependency | AppDependency)[]
        outbound: (InterTeamAppDependency | AppDependency)[]
        external: { host: string }[]
    }
}

export type TopicDependency = { application: string; namespace: string }

export type TopicMetadata = {
    type: 'topic'
    topic: string
    namespace: string
    dependencies: {
        readwrite: TopicDependency[]
        write: TopicDependency[]
        read: TopicDependency[]
    }
}
