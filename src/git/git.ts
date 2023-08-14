import * as fs from 'node:fs'
import path from 'node:path'
import simpleGit from 'simple-git'

export const gitOutputDir = path.join(process.cwd(), '.cache')

if (!fs.existsSync(gitOutputDir)) {
    fs.mkdirSync(gitOutputDir)
}

export const git = simpleGit({
    baseDir: gitOutputDir,
    binary: 'git',
    maxConcurrentProcesses: 10,
})
