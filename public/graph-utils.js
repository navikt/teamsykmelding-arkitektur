import * as R from 'https://cdn.jsdelivr.net/npm/remeda@1.24.1/+esm'

export function getTeamSykmeldingAppNodes(applications, options) {
    return R.pipe(
        applications,
        R.flatMap((it) => {
            if (it.app.startsWith('macgyver') && !options.showMacgyver) return []

            const app = { id: `${it.app}-app`, label: `${it.app}`, group: it.namespace, shape: 'box' }

            if (it.databases) {
                return [
                    app,
                    ...it.databases.map((db) => {
                        const [first] = db.databases
                        return {
                            id: `${first}-db`,
                            font: { size: 12 },
                            label: `${first}`,
                            shape: 'hexagon',
                            icon: { code: '\uf1c0' },
                            parent: `${it.app}-app`,
                        }
                    }),
                ]
            }

            return [app]
        }),
    )
}

export function getAppIngressEdges(applications) {
    return R.pipe(
        applications,
        R.filter((it) => it.ingress),
        R.map(({ ingress, app }) => {
            const wonderwall = ingress.wonderwall
            const isInternal = ingress.ingress.includes('intern')

            return {
                from: isInternal ? 'internal-user' : 'user',
                to: `${app}-app`,
                label: wonderwall === 'idporten' ? 'ID-porten' : wonderwall === 'azure' ? 'Azure' : undefined,
                arrows: { to: { enabled: true } },
                color: wonderwall === null ? '#FF0000' : undefined,
            }
        }),
    )
}

export function getDatabaseToAppEdges(appNodesWithParents) {
    return R.pipe(
        appNodesWithParents,
        R.filter((it) => it.parent),
        R.map((it) => ({ from: it.id, to: it.parent, length: 4, arrows: { from: { enabled: true } } })),
    )
}

export function getTeamsykmeldingKafkaTopicNodes(topics) {
    return R.pipe(
        topics,
        R.map((it) => ({
            id: `${it.topic}-topic`,
            label: it.topic,
            group: 'teamsykmelding-topic',
            shape: 'box',
        })),
    )
}

export function getOtherTeamAppNodes(applications, topics, options, toggleMetadata) {
    const otherAppDeps = R.pipe(
        applications,
        R.flatMap((it) => [...it.dependencies.outbound, ...it.dependencies.inbound]),
        R.filter((it) => 'namespace' in it),
        R.filter((it) => it.namespace !== 'teamsykmelding'),
    )

    const otherTopicDeps = options.showKafka
        ? R.pipe(
              topics,
              R.flatMap((it) => [...it.dependencies.read, ...it.dependencies.write]),
              R.filter((it) => it.namespace !== 'teamsykmelding'),
          )
        : []

    toggleMetadata.kafkaIds.nodes.push(...otherTopicDeps.map((it) => `${it.application}-app`))

    return R.pipe(
        [...otherAppDeps, ...otherTopicDeps],
        R.uniqBy((it) => it.application),
        R.map((it) => ({
            id: `${it.application}-app`,
            label: `${it.namespace}\n${it.application}`,
            group: it.namespace,
            shape: 'box',
            font: {
                face: 'monospace',
                align: 'left',
            },
        })),
    )
}

export function getExternalNodes(applications) {
    return R.pipe(
        applications,
        R.filter((it) => it.dependencies.external.length > 0),
        R.flatMap((it) =>
            it.dependencies.external.map((it) => ({
                id: `${it.host}-app`,
                label: it.host,
                group: 'external-app',
                shape: 'box',
            })),
        ),
        R.uniqBy((it) => it.id),
    )
}

export function getAccessPolicyEdges(applications) {
    const rawEdges = R.pipe(
        applications,
        R.filter((it) => it.dependencies),
        R.flatMap((app) => [
            ...app.dependencies.inbound.map((it) => ({
                to: `${app.app}-app`,
                from: `${it.application}-app`,
                arrows: { to: { enabled: true } },
            })),
            ...app.dependencies.outbound.map((it) => {
                return {
                    to: `${it.application}-app`,
                    from: `${app.app}-app`,
                    arrows: { to: { enabled: true } },
                }
            }),
            ...app.dependencies.external.map((it) => {
                return {
                    to: `${app.app}-app`,
                    from: `${it.host}-app`,
                    arrows: { from: { enabled: true } },
                }
            }),
        ]),
    )

    const [simplexEdges, duplexEdges] = R.pipe(
        rawEdges,
        R.groupBy((it) => `${it.from}-${it.to}`),
        R.toPairs,
        R.partition((it) => it[1].length === 1),
    )

    console.log([simplexEdges, duplexEdges])

    return [
        ...simplexEdges.flatMap(([, edges]) => edges),
        ...duplexEdges.map(([, edges]) => ({
            to: edges[0].to,
            from: edges[0].from,
            arrows: { to: { enabled: true }, color: 'red' },
            width: 3,
        })),
    ]
}

export function getTopicEdges(topics) {
    return R.pipe(
        topics,
        R.flatMap((topic) => [
            ...topic.dependencies.readwrite.map((it) => ({
                from: `${it.application}-app`,
                to: `${topic.topic}-topic`,
                arrows: { from: { enabled: true }, to: { enabled: true } },
                width: 3,
            })),
            ...topic.dependencies.read.map((it) => ({
                from: `${it.application}-app`,
                to: `${topic.topic}-topic`,
                arrows: { from: { enabled: true } },
            })),
            ...topic.dependencies.write.map((it) => ({
                from: `${topic.topic}-topic`,
                to: `${it.application}-app`,
                arrows: { from: { enabled: true } },
            })),
        ]),
    )
}

export function createMacgyverNodes(applications) {
    const macgyverApps = applications.filter((it) => it.app.startsWith('macgyver'))

    return getTeamSykmeldingAppNodes(macgyverApps, { showMacgyver: true })
}
