import { type Serve } from 'bun'
import path from 'node:path'
import { getCachedDependencyGraphFile } from '../dependency-graph/build.ts'
import { devModeBrowserScript, devModeMessageHandler } from './dev-mode.ts'

const graphFile = await getCachedDependencyGraphFile()

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
            return new Response(`window.graph = ${JSON.stringify(graphFile)}`, {
                headers: {
                    'content-type': 'application/javascript',
                },
            })
        }

        if (url.pathname === '/graph.js' || url.pathname === '/graph-utils.js') {
            return new Response(await Bun.file(path.join(process.cwd(), 'public', url.pathname)).text(), {
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

        if (url.pathname.startsWith('/internal/is_')) {
            return Response.json({ message: "I'm alive :-)" })
        }

        return new Response(`Fant ikke ressursen ${url.pathname}`, {
            status: 404,
            headers: { contentType: 'text/plain' },
        })
    },
    websocket: {
        message: devModeMessageHandler,
    },
} satisfies Serve
