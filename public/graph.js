import * as R from 'https://cdn.jsdelivr.net/npm/remeda@1.24.1/+esm'

const cluster = window.graph['prod-gcp']

const teamSykmeldingAppNodes = R.pipe(
    cluster.applications,
    R.flatMap((it) => {
        const app = { id: `${it.app}-app`, label: it.app, group: it.namespace, shape: 'box' }

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

const teamSykmeldingTopicNodes = R.pipe(
    cluster.topics,
    R.map((it) => ({
        id: `${it.topic}-topic`,
        label: it.topic,
        group: 'teamsykmelding-topic',
        shape: 'box',
    })),
)

const otherAppDeps = R.pipe(
    cluster.applications,
    R.flatMap((it) => [...it.dependencies.outbound, ...it.dependencies.inbound]),
    R.filter((it) => 'namespace' in it),
    R.filter((it) => it.namespace !== 'teamsykmelding'),
)

const otherTopicDeps = R.pipe(
    cluster.topics,
    R.flatMap((it) => [...it.dependencies.read, ...it.dependencies.write]),
    R.filter((it) => it.namespace !== 'teamsykmelding'),
)

const otherAppNodes = R.pipe(
    [...otherAppDeps, ...otherTopicDeps],
    R.uniqBy((it) => it.application),
    R.map((it) => ({
        id: `${it.application}-app`,
        label: it.application,
        group: it.namespace,
        shape: 'ellipse',
    })),
)

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

const nodes = new vis.DataSet([
    ...teamSykmeldingAppNodes,
    ...otherAppNodes,
    ...externalNodes,
    ...teamSykmeldingTopicNodes,
])

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

const databaseToAppEdges = R.pipe(
    teamSykmeldingAppNodes,
    R.filter((it) => it.parent),
    R.map((it) => ({ from: it.id, to: it.parent, arrows: { from: { enabled: true } } })),
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

const accessPolicyEdges = R.pipe(
    cluster.applications,
    R.filter((it) => it.dependencies),
    R.flatMap((app) => [
        ...app.dependencies.inbound.map((it) => ({
            to: `${it.application}-app`,
            from: `${app.app}-app`,
            arrows: { to: { enabled: true } },
        })),
        ...app.dependencies.outbound.map((it) => {
            return {
                to: `${app.app}-app`,
                from: `${it.application}-app`,
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

const edges = new vis.DataSet([...appIngressEdges, ...databaseToAppEdges, ...topicEdges, ...accessPolicyEdges])

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
                font: { color: '#ffffff' },
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

network.on('click', function (params) {
    console.log(params)
})
