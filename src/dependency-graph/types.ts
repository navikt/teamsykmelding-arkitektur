export type AppMetadata = {
    app: string
    namespace: string
    ingress: string | null
    databases: { name: string; databases: string[] }[] | null
    dependencies: {
        inbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
        outbound: ({ application: string } | { application: string; namespace: string; cluster: string })[]
        external: { host: string }[]
    }
}
