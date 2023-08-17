import { type Serve } from 'bun'
import path from 'node:path'
import { buildDependencyGraph } from '../dependency-graph/build.ts'

export default {
    async fetch(req) {
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
            return new Response(`window.tototot = ${JSON.stringify(dependencyGraphData)}`, {
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
            return new Response(await Bun.file(path.join(process.cwd(), 'public', 'index.html')).text(), {
                headers: {
                    'content-type': 'text/html',
                },
            })
        }

        return new Response(`Fant ikke ressursen ${url.pathname}`, {
            status: 404,
            headers: { contentType: 'text/plain' },
        })
    },
} satisfies Serve
