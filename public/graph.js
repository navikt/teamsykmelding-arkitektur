import {
    createMacgyverNodes,
    getAccessPolicyEdges,
    getAppIngressEdges,
    getDatabaseToAppEdges,
    getExternalNodes,
    getOtherTeamAppNodes,
    getTeamSykmeldingAppNodes,
    getTeamsykmeldingKafkaTopicNodes,
    getTopicEdges,
} from './graph-utils.js'
import { createAppMetadataMap, getCluster, updateOptions, updateUrl, wait } from './utils.js'

const params = new URLSearchParams(window.location.search)

const defaultOptions = {
    cluster: params.get('cluster')?.trim() ? params.get('cluster') : 'prod-gcp',
    showKafka: params.get('kafka') ? params.get('kafka') === 'true' : null ?? true,
    showMacgyver: params.get('macgyver') ? params.get('macgyver') === 'true' : null ?? false,
    showExternal: params.get('external') ? params.get('external') === 'true' : null ?? false,
}

document.getElementById('show-kafka').checked = defaultOptions.showKafka
document.getElementById('show-external').checked = defaultOptions.showExternal
document.getElementById('show-macgyver').checked = defaultOptions.showMacgyver

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

const appMetadata = createAppMetadataMap()

const baseUsers = [
    { id: 'user', label: 'Bruker', group: 'user' },
    { id: 'internal-user', label: 'Intern bruker', group: 'internalUser' },
]

async function initializeGraph(options) {
    const cluster = getCluster(options.cluster)

    nodes.clear()
    edges.clear()

    const batchedNodes = [...baseUsers]
    const batchedEdges = []

    const teamSykmeldingAppNodes = getTeamSykmeldingAppNodes(cluster.applications, options)
    const appIngressEdges = getAppIngressEdges(cluster.applications)
    const databaseToAppEdges = getDatabaseToAppEdges(teamSykmeldingAppNodes)

    batchedNodes.push(...teamSykmeldingAppNodes)
    batchedEdges.push(...databaseToAppEdges)
    batchedEdges.push(...appIngressEdges)

    if (options.showKafka) {
        const teamSykmeldingTopicNodes = getTeamsykmeldingKafkaTopicNodes(cluster.topics)

        toggleMetadata.kafkaIds.nodes.push(...teamSykmeldingTopicNodes.map((it) => it.id))

        batchedNodes.push(...teamSykmeldingTopicNodes)
    }

    const otherAppNodes = getOtherTeamAppNodes(cluster.applications, cluster.topics, options, toggleMetadata)
    batchedNodes.push(...otherAppNodes)

    if (options.showExternal) {
        const externalNodes = getExternalNodes(cluster.applications)

        toggleMetadata.externalIds.nodes = externalNodes.map((it) => it.id)

        batchedNodes.push(...externalNodes)
    }

    const accessPolicyEdges = getAccessPolicyEdges(cluster.applications, options)
    batchedEdges.push(...accessPolicyEdges)

    const topicEdges = getTopicEdges(cluster.topics)

    batchedEdges.push(...topicEdges)

    nodes.add(batchedNodes)
    edges.add(batchedEdges)

    await wait(500)
    network.fit({ animation: true })
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
        physics: {
            solver: 'forceAtlas2Based',
        },
    },
)

initializeGraph(defaultOptions).then(() => {
    updateOptions(nodes)
})

network.on('click', function (params) {
    const metadata = appMetadata.get(params.nodes[0])
    const node = document.getElementById('focus-info')
    if (params.nodes.length > 0) {
        const cluster = getCluster(defaultOptions.cluster)
        const app = cluster.applications.find((it) => `${it.app}-app` === params.nodes[0])
        node.setAttribute('data-focused', 'true')
        node.innerHTML = `
        <pre>${params.nodes}</pre>
        ${metadata ? `<a href="${metadata.repoUrl}" target="_blank">Github</a>` : ''}
        ${app ? `<pre>${JSON.stringify(app, null, 2)}</pre>` : ''}
      `
    } else {
        document.getElementById('focus-info').setAttribute('data-focused', 'false')
        node.innerHTML = ''
    }
})

document.getElementById('show-kafka').addEventListener('click', (event) => {
    defaultOptions.showKafka = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showKafka) {
        nodes.remove(toggleMetadata.kafkaIds.nodes)
        toggleMetadata.kafkaIds.nodes = []
    } else {
        setButtonDisabledness(true)
        initializeGraph(defaultOptions).finally(() => setButtonDisabledness(false))
    }
})

document.getElementById('show-external').addEventListener('click', (event) => {
    defaultOptions.showExternal = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showExternal) {
        nodes.remove(toggleMetadata.externalIds.nodes)
        toggleMetadata.externalIds.nodes = []
    } else {
        const externalNodes = getExternalNodes(getCluster(defaultOptions.cluster).applications)

        toggleMetadata.externalIds.nodes = externalNodes.map((it) => it.id)

        nodes.add(externalNodes)
    }
})

document.getElementById('show-macgyver').addEventListener('click', (event) => {
    defaultOptions.showMacgyver = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showMacgyver) {
        nodes.remove(['macgyver-frontend-app', 'macgyver-app'])
    } else {
        nodes.add(createMacgyverNodes(getCluster(defaultOptions.cluster).applications))
    }
})

document.getElementById('cluster').addEventListener('change', async (event) => {
    defaultOptions.cluster = event.currentTarget.value
    updateUrl(defaultOptions)

    await initializeGraph(defaultOptions)
    updateOptions(nodes)
})

document.getElementById('app-picker').addEventListener('input', async (event) => {
    const value = event.currentTarget.value?.trim()
    if (!value) return
    if (nodes.get(value) == null) return

    network.focus(value, { scale: 1, animation: true })
    network.setSelection({ nodes: [value] })
})

function setButtonDisabledness(disabled) {
    document.getElementById('show-kafka').disabled = disabled
    document.getElementById('show-external').disabled = disabled
    document.getElementById('show-macgyver').disabled = disabled
}
