import path from 'node:path'
import * as fs from 'node:fs'
import { cloner, createPuller, gitOutputDir } from './git'

export async function cloneOrPull(repo: string): Promise<void> {
    await (exists(repo) ? pull(repo) : clone(repo))
}

export async function updateCacheMetadata(): Promise<void> {
    await Bun.write(path.join(gitOutputDir, 'cache.json'), JSON.stringify({ timestamp: Date.now() }, null, 2))
}

export async function readCacheMetadata(): Promise<{ timestamp: number }> {
    return await Bun.file(path.join(gitOutputDir, 'cache.json')).json()
}

async function clone(repo: string) {
    const remote = `https://${Bun.env.GH_TOKEN}:x-oauth-basic@github.com/navikt/${repo}`

    const t1 = performance.now()
    await cloner.clone(remote, repo, { '--depth': 1 })

    console.info(`Cloned ${repo} OK (${Math.round(performance.now() - t1)}ms))`)
}

async function pull(repo: string) {
    const t1 = performance.now()
    await createPuller(repo).pull({
        '--rebase': null,
    })

    console.info(`${repo}, exists, pulled OK (${Math.round(performance.now() - t1)}ms)`)
}

function exists(repo: string): boolean {
    return fs.existsSync(path.join(gitOutputDir, repo))
}
