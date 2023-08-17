import { type Serve } from 'bun'
import path from 'node:path'
import { buildDependencyGraph } from '../dependency-graph/build.ts'
import { randomUUID } from 'crypto'

const devModeUuid = Bun.env.NODE_ENV === 'production' ? null : randomUUID()

export default {
    async fetch(req, server) {
        const url = new URL(req.url)

        if (url.pathname === '/favicon.ico') {
            return new Response(null, {
                status: 301,
                headers: {
                    location: 'https://nav.no/favicon.ico',
                },
            })
        }

        if (url.pathname === '/data/graph-data.js') {
            const dependencyGraphData = await buildDependencyGraph({ cache: true })
            return new Response(`window.graph = ${JSON.stringify(dependencyGraphData)}`, {
                headers: {
                    'content-type': 'application/javascript',
                },
            })
        }

        if (url.pathname === '/graph.js') {
            return new Response(await Bun.file(path.join(process.cwd(), 'public', 'graph.js')).text(), {
                headers: {
                    'content-type': 'application/javascript',
                },
            })
        }

        if (url.pathname === '/') {
            const html = (await Bun.file(path.join(process.cwd(), 'public', 'index.html')).text()).replaceAll(
                '${{ DYNAMIC_SCRIPTS }}',
                Bun.env.NODE_ENV === 'production' ? '' : '<script src="/dev.js"></script>',
            )

            return new Response(html, {
                headers: {
                    'content-type': 'text/html',
                },
            })
        }

        if (Bun.env.NODE_ENV !== 'production') {
            if (url.pathname === '/dev') {
                if (server.upgrade(req)) {
                    return
                }

                return new Response('This is a websocket endpoint', { status: 400 })
            }

            if (url.pathname === '/dev.js') {
                return new Response(devModeBrowserScript, { headers: { 'content-type': 'application/javascript' } })
            }
        }

        return new Response(`Fant ikke ressursen ${url.pathname}`, {
            status: 404,
            headers: { contentType: 'text/plain' },
        })
    },
    websocket: {
        async message(ws, message) {
            if (message === 'whoareyou') {
                ws.send(devModeUuid ?? '')
            }
        },
    },
} satisfies Serve

const devModeBrowserScript = /* language=JavaScript */ `let webSocket = null;
let initialDevUUID = null;

setInterval(() => {
    webSocket.send('whoareyou')
}, 1000)

webSocket = webSockIt()

function webSockIt() {
    console.info("Setting up dev reload socket")

    webSocket = new WebSocket('ws://localhost:3000/dev')
    webSocket.onerror = () => {
        setTimeout(() => {
            webSocket = webSockIt()
        }, 500)
    }

    webSocket.onclose = () => {
        setTimeout(() => {
            webSocket = webSockIt()
        }, 500)
    }
    webSocket.onmessage = (event) => {
        if (initialDevUUID == null) {
            initialDevUUID = event.data
            return;
        }

        console.log(initialDevUUID !== event.data, initialDevUUID, event.data)
        if (initialDevUUID !== event.data) {
            console.log('Hot reloading')
            window.location.reload()
        }
    }

    return webSocket;
}
`
