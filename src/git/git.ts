import * as fs from 'node:fs'
import path from 'node:path'
import simpleGit, { SimpleGit } from 'simple-git'

export const gitOutputDir = path.join(process.cwd(), '.cache')

if (!fs.existsSync(gitOutputDir)) {
    fs.mkdirSync(gitOutputDir, { recursive: true })
}

export const cloner = simpleGit({
    baseDir: gitOutputDir,
    binary: 'git',
    maxConcurrentProcesses: 10,
})

export function createPuller(repo: string): SimpleGit {
    return simpleGit({
        baseDir: `${gitOutputDir}/${repo}`,
        binary: 'git',
        maxConcurrentProcesses: 1,
    })
}
