import path from 'node:path'
import * as fs from 'node:fs'
import { cloner, createPuller, gitOutputDir } from './git'

export async function cloneOrPull(repo: string): Promise<void> {
    await (exists(repo) ? pull(repo) : clone(repo))
}

async function clone(repo: string) {
    const remote = `https://${Bun.env.GH_TOKEN}:x-oauth-basic@github.com/navikt/${repo}`

    await cloner.clone(remote, repo, { '--depth': 1 })

    console.info(`Cloned ${repo} OK`)
}

async function pull(repo: string) {
    await createPuller(repo).pull({
        '--rebase': null,
    })

    console.info(`${repo}, exists, pulled OK`)
}

function exists(repo: string): boolean {
    return fs.existsSync(path.join(gitOutputDir, repo))
}
