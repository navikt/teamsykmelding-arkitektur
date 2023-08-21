export function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms))
}

export function updateUrl(options) {
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

export function updateOptions(nodes) {
    document.getElementById('apps').innerHTML = `
    ${nodes.map((node) => `<option value="${node.id}">${node.label}</option>`).join('')}
  `
}

export function getCluster(name) {
    return window.graph[name]
}

export function createAppMetadataMap() {
    const map = new Map()

    Object.entries(window.graph).forEach(([clusterName, cluster]) => {
        cluster.applications.forEach((app) => {
            map.set(`${app.app}-app`, { repoUrl: app.repoUrl })
        })
    })

    return map
}
