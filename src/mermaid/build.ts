import * as R from 'remeda'

import { DepedencyNodeMetadata, NodeDependencies } from '../dependency-graph-old/types.ts'

export function buildMermaid(graph: DepedencyNodeMetadata[]): string {
    const baseNodes = graph
        .map((it) => it.application)
        .slice(0, 5)
        .join('\n')

    const outboundConnections = graph.map((node) => createOutboundNodes(node.application, node.environments))

    return `flowchart TB
    ${baseNodes}
    ${outboundConnections.join('\n')}
`
}

function createOutboundNodes(application: string, environments: { env: string; dependencies: NodeDependencies }[]) {
    return `
        ${environments.map((env) => {
            console.log('env', env.env)
            return `
                subgraph ${env.env}
                ${env.dependencies.outbound.map((it) => `${application}--->${it.application}`).join('\n')}
                ${env.dependencies.inbound.map((it) => `${application}<---${it.application}`).join('\n')}
                end
            `
        })}
    `
}
