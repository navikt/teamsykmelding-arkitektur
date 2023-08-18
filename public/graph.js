import {
    getAccessPolicyEdges,
    getAppIngressEdges,
    getDatabaseToAppEdges,
    getExternalNodes,
    getOtherTeamAppNodes,
    getTeamSykmeldingAppNodes,
    getTeamsykmeldingKafkaTopicNodes,
    getTopicEdges,
} from './graph-utils.js'
import { updateUrl, wait } from './utils.js'

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

const baseUsers = [
    { id: 'user', label: 'Bruker', group: 'user' },
    { id: 'internal-user', label: 'Intern bruker', group: 'internalUser' },
]

async function updateGraph(options) {
    nodes.clear()
    edges.clear()

    nodes.add(baseUsers)

    const teamSykmeldingAppNodes = getTeamSykmeldingAppNodes(cluster.applications, options)
    const appIngressEdges = getAppIngressEdges(cluster.applications)
    const databaseToAppEdges = getDatabaseToAppEdges(teamSykmeldingAppNodes)

    nodes.add(teamSykmeldingAppNodes)
    edges.add(databaseToAppEdges)
    edges.add(appIngressEdges)

    await wait(500)

    if (options.showKafka) {
        const teamSykmeldingTopicNodes = getTeamsykmeldingKafkaTopicNodes(cluster.topics)

        toggleMetadata.kafkaIds.nodes = teamSykmeldingTopicNodes.map((it) => it.id)

        nodes.add(teamSykmeldingTopicNodes)
        await wait(500)
    }

    const otherAppNodes = getOtherTeamAppNodes(cluster.applications, cluster.topics, options)
    nodes.add(otherAppNodes)
    await wait(500)

    if (options.showExternal) {
        const externalNodes = getExternalNodes(cluster.applications)

        toggleMetadata.externalIds.nodes = externalNodes.map((it) => it.id)

        nodes.add(externalNodes)
        await wait(500)
    }

    const accessPolicyEdges = getAccessPolicyEdges(cluster.applications)
    edges.add(accessPolicyEdges)
    await wait(1500)

    const topicEdges = getTopicEdges(cluster.topics)

    edges.add(topicEdges)
    await wait(500)
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
        setButtonDisabledness(true)
        updateGraph(defaultOptions).finally(() => setButtonDisabledness(false))
    }
})

document.getElementById('show-external').addEventListener('click', (event) => {
    defaultOptions.showExternal = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showExternal) {
        nodes.remove(toggleMetadata.externalIds.nodes)
        toggleMetadata.externalIds.nodes = []
    } else {
        setButtonDisabledness(true)
        updateGraph(defaultOptions).finally(() => setButtonDisabledness(false))
    }
})

document.getElementById('show-macgyver').addEventListener('click', (event) => {
    defaultOptions.showMacgyver = event.currentTarget.checked
    updateUrl(defaultOptions)

    if (!defaultOptions.showMacgyver) {
        nodes.remove(['macgyver-frontend-app', 'macgyver-app'])
    } else {
        setButtonDisabledness(true)
        updateGraph(defaultOptions).finally(() => setButtonDisabledness(false))
    }
})

function setButtonDisabledness(disabled) {
    document.getElementById('show-kafka').disabled = disabled
    document.getElementById('show-external').disabled = disabled
    document.getElementById('show-macgyver').disabled = disabled
}
