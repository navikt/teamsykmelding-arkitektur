import { AppMetadata, DatabaseMetadata, DependencyGraphEnvironment, TopicMetadata } from '../dependency-graph/types.ts'
import { raise } from '../utils.ts'

export function buildMermaid(graph: DependencyGraphEnvironment): string {
    const baseNodes = graph.applications.map(createAppSubGraph).join('\n    ')
    const outboundConnections = graph.applications
        .filter((it) => it.dependencies.outbound.length)
        .map(createOutboundConnections)
        .join('\n    ')
    const ingressConnections = graph.applications
        .filter((it) => it.ingress)
        .map(createIngressConnections)
        .join('\n    ')

    const baseTopicNodes = graph.topics.map(createTopicNode).join('\n    ')
    const topicConnections = graph.topics.map(createTopicConnections).join('\n    ')

    const users = `
    internal-users>Internal users]
    external-users>External users]
`

    return `flowchart LR
    ${users}
    ${baseNodes}
    subgraph topics
    direction TB
    ${baseTopicNodes}
    end
    ${ingressConnections}
    ${outboundConnections}
    ${topicConnections}
`
}

function createIngressConnections(app: AppMetadata) {
    const metadata = app.ingress ?? raise('App has no ingress')
    const isInternal = metadata.ingress.includes('intern')

    if (metadata.wonderwall == null) {
        return `    ${isInternal ? 'internal-users' : 'external-users'} --> ${app.app}-app`
    } else {
        return `    ${isInternal ? 'internal-users' : 'external-users'} --> ${app.app}-${metadata.wonderwall}-sidecar`
    }
}

function createAppSubGraph(app: AppMetadata) {
    return `
    subgraph ${app.app}-parent[${app.app}]
    direction TB
    ${createApplicationNode(app)}
    ${createDatabaseNode(app.app, app.databases)}
    ${createSidecarNodes(app)}
    end`
}

function createTopicNode(topic: TopicMetadata) {
    return `
    ${topic.topic}-topic[${topic.topic}]
`
}

function createTopicConnections(topic: TopicMetadata) {
    const read = topic.dependencies.read.map((it) => `${topic.topic}-topic --> ${it.application}-app`).join('\n    ')
    const write = topic.dependencies.write.map((it) => `${it.application}-app --> ${topic.topic}-topic`).join('\n    ')

    return `
    ${read}
    ${write}`
}

function createSidecarNodes(app: AppMetadata) {
    if (app.ingress == null) return ''
    if (app.ingress.wonderwall == null) return ''

    return `
    ${app.app}-${app.ingress.wonderwall}-sidecar[${app.ingress.wonderwall} sidecar]
    ${app.app}-${app.ingress.wonderwall}-sidecar --> ${app.app}-app
`
}

function createOutboundConnections(app: AppMetadata) {
    return `
    ${app.dependencies.outbound.map((it) => `${app.app}-app --> ${it.application}-app`).join('\n    ')}
`
}

function createApplicationNode(app: AppMetadata) {
    return `${app.app}-app[${app.app}]`
}

function createDatabaseNode(parent: string, databases: { name: string; databases: string[] }[] | null) {
    const dbNode = (db: DatabaseMetadata) => `${parent}-${db.name}[("${db.databases.join('\n')}")]
    ${parent}-app --> ${parent}-${db.name}`

    return databases?.map(dbNode).join('\n    ') || ''
}
