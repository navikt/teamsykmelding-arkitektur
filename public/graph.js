import * as R from 'https://cdn.jsdelivr.net/npm/remeda@1.24.1/+esm'

const params = new URLSearchParams(window.location.search)

const defaultOptions = {
    cluster: params.get('cluster')?.trim() ? params.get('cluster') : 'prod-gcp',
    showKafka: params.get('kafka') ? params.get('kafka') === 'true' : null ?? true,
    showMacgyver: params.get('macgyver') ? params.get('macgyver') === 'true' : null ?? false,
    showExternal: params.get('external') ? params.get('external') === 'true' : null ?? false,
}

function updateUrl(options) {
    const url = new URL(window.location.href)
    const setIfTrue = (key, value) => (value ? url.searchParams.set(key, value) : url.searchParams.delete(key))
    const setIfFalse = (key, value) => (!value ? url.searchParams.set(key, value) : url.searchParams.delete(key))

    if (options.cluster !== 'prod-gcp') {
        url.searchParams.set('cluster', options.cluster)
    } else {
        url.searchParams.delete('cluster')
    }

    setIfFalse('kafka', options.showKafka)
    setIfTrue('macgyver', options.showMacgyver)
    setIfTrue('external', options.showExternal)
    window.history.replaceState({}, '', url)
}

document.getElementById('show-kafka').checked = defaultOptions.showKafka
document.getElementById('show-external').checked = defaultOptions.showExternal
document.getElementById('show-macgyver').checked = defaultOptions.showMacgyver

const cluster = window.graph['prod-gcp']

const nodes = new vis.DataSet()
const edges = new vis.DataSet()

const toggleMetadata = {
    externalIds: {
        nodes: [],
        edges: [],
    },
    kafkaIds: {
        nodes: [],
        edges: [],
    },
}

async function updateGraph(options) {
    nodes.clear()
    edges.clear()

    nodes.add([
        {
            id: 'user',
            label: 'Bruker',
            group: 'user',
        },
        {
            id: 'internal-user',
            label: 'Intern bruker',
            group: 'internalUser',
        },
    ])

    const teamSykmeldingAppNodes = R.pipe(
        cluster.applications,
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

    const appIngressEdges = R.pipe(
        cluster.applications,
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

    const databaseToAppEdges = R.pipe(
        teamSykmeldingAppNodes,
        R.filter((it) => it.parent),
        R.map((it) => ({ from: it.id, to: it.parent, length: 4, arrows: { from: { enabled: true } } })),
    )

    nodes.add(teamSykmeldingAppNodes)
    edges.add(databaseToAppEdges)
    edges.add(appIngressEdges)

    await new Promise((resolve) => setTimeout(resolve, 500))

    await new Promise((resolve) => setTimeout(resolve, 500))

    if (options.showKafka) {
        const teamSykmeldingTopicNodes = R.pipe(
            cluster.topics,
            R.map((it) => ({
                id: `${it.topic}-topic`,
                label: it.topic,
                group: 'teamsykmelding-topic',
                shape: 'box',
            })),
        )

        toggleMetadata.kafkaIds.nodes = teamSykmeldingTopicNodes.map((it) => it.id)

        nodes.add(teamSykmeldingTopicNodes)
        await new Promise((resolve) => setTimeout(resolve, 500))
    }

    const otherAppDeps = R.pipe(
        cluster.applications,
        R.flatMap((it) => [...it.dependencies.outbound, ...it.dependencies.inbound]),
        R.filter((it) => 'namespace' in it),
        R.filter((it) => it.namespace !== 'teamsykmelding'),
    )

    const otherTopicDeps = options.showKafka
        ? R.pipe(
              cluster.topics,
              R.flatMap((it) => [...it.dependencies.read, ...it.dependencies.write]),
              R.filter((it) => it.namespace !== 'teamsykmelding'),
          )
        : []

    const otherAppNodes = R.pipe(
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

    nodes.add(otherAppNodes)
    await new Promise((resolve) => setTimeout(resolve, 500))

    if (options.showExternal) {
        const externalNodes = R.pipe(
            cluster.applications,
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

        toggleMetadata.externalIds.nodes = externalNodes.map((it) => it.id)

        nodes.add(externalNodes)
        await new Promise((resolve) => setTimeout(resolve, 500))
    }

    const accessPolicyEdges = R.pipe(
        cluster.applications,
        R.filter((it) => it.dependencies),
        R.flatMap((app) => [
            ...app.dependencies.inbound.map((it) => ({
                to: `${app.app}-app`,
                from: `${it.application}-app`,
                arrows: { to: { enabled: true } },
            })),
            ...app.dependencies.outbound.map((it) => {
                return {
                    to: `${app.app}-app`,
                    from: `${it.application}-app`,
                    arrows: { from: { enabled: true } },
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

    edges.add(accessPolicyEdges)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const topicEdges = R.pipe(
        cluster.topics,
        R.flatMap((topic) => [
            ...topic.dependencies.read.map((it) => ({
                from: `${it.application}-app`,
                to: `${topic.topic}-topic`,
                arrows: { to: { enabled: true } },
            })),
            ...topic.dependencies.write.map((it) => ({
                from: `${topic.topic}-topic`,
                to: `${it.application}-app`,
                arrows: { to: { enabled: true } },
            })),
        ]),
    )

    edges.add(topicEdges)
    await new Promise((resolve) => setTimeout(resolve, 500))
}

const network = new vis.Network(
    document.getElementById('network-graph'),
    {
        nodes: nodes,
        edges: edges,
    },
    {
        groups: {
            noAuthConnection: {
                color: { color: '#ff5a5a', highlight: '#ff5a5a', hover: '#ff5a5a' },
            },
            teamsykmelding: {
                font: {
                    face: 'monospace',
                    align: 'left',
                    color: '#ffffff',
                },
                color: { background: 'green', border: 'darkgreen' },
            },
            user: {
                shape: 'icon',
                icon: {
                    face: "'FontAwesome'",
                    code: '\uf0c0',
                    size: 50,
                    color: '#3694ff',
                },
            },
            internalUser: {
                shape: 'icon',
                icon: {
                    face: "'FontAwesome'",
                    code: '\uf0c0',
                    size: 50,
                    color: '#ff5a5a',
                },
            },
        },
    },
)

updateGraph(defaultOptions)

network.on('click', function (params) {
    console.log(params)
})

document.getElementById('show-kafka').addEventListener('click', (event) => {
    defaultOptions.showKafka = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showKafka) {
        nodes.remove(toggleMetadata.kafkaIds.nodes)
        toggleMetadata.kafkaIds.nodes = []
    } else {
        updateGraph(defaultOptions)
    }
})

document.getElementById('show-external').addEventListener('click', (event) => {
    defaultOptions.showExternal = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showExternal) {
        nodes.remove(toggleMetadata.externalIds.nodes)
        toggleMetadata.externalIds.nodes = []
    } else {
        updateGraph(defaultOptions)
    }
})

document.getElementById('show-macgyver').addEventListener('click', (event) => {
    defaultOptions.showMacgyver = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showMacgyver) {
        nodes.remove(['macgyver-frontend-app', 'macgyver-app'])
    } else {
        updateGraph(defaultOptions)
    }
})
