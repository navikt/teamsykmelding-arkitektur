import path from 'node:path'
import { glob } from 'glob'

export async function globDirForYaml(repoDir: string) {
    return await glob(path.join(repoDir, '**/**/*.y*ml'), {
        dot: true,
        ignore: [
            '**/.yarn/**',
            '**/.yarnrc.yml',
            '**/dependabot.yml',
            '**/codegen.yml',
            '**/resources/**',
            '**/oas3/**',
        ],
    })
}
