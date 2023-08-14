import path from 'node:path'
import * as fs from 'node:fs'
import { git, gitOutputDir } from './git'

export async function cloneOrPull(repo: string): Promise<void> {
    const remote = `https://${Bun.env.GH_TOKEN}:x-oauth-basic@github.com/navikt/${repo}`

    if (exists(repo)) {
        git.pull(remote, undefined, {
            '--rebase': null,
        })
        console.info(`${repo}, exists, pulled OK`)
        return
    }
    await git.clone(remote, repo, { '--depth': 1 })

    console.info(`Cloned ${repo} OK`)
}

function exists(repo: string): boolean {
    return fs.existsSync(path.join(gitOutputDir, repo))
}
