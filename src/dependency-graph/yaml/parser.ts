import { load } from 'js-yaml'
import { compact } from 'remeda'

import { NaisSchema } from './schemas/nais-schema.ts'
import { GithubActionsSchema } from './schemas/gha-schema.ts'
import { raise } from '../../utils.ts'
import { NaisTopicSchema } from './schemas/nais-topic-schema.ts'
import { NaisJobSchema } from './schemas/nais-job.schema.ts'

export type NaisApplication = {
    type: 'app'
    filename: string
    absolutePath: string
    application: NaisSchema
}

export type NaisTopic = {
    type: 'topic'
    filename: string
    absolutePath: string
    topic: NaisTopicSchema
}

export type GithubAction = {
    type: 'action'
    filename: string
    absolutePath: string
    repoUrl: string
    action: GithubActionsSchema
}

export type NaisOther = {
    type: 'other'
    kind: string
    filename: string
    absolutePath: string
    isOther: true
}

export type WorkingFiles = NaisApplication | NaisTopic | GithubAction | NaisOther

export const parseYaml =
    (absoluteRepoPath: string) =>
    async (file: string): Promise<(WorkingFiles | null)[]> => {
        const content = await Bun.file(file).text()

        return await Promise.all(
            compact(content.split('---')).map((section) => parseYamlDocument(absoluteRepoPath, file, section)),
        )
    }

async function parseYamlDocument(
    absoluteRepoPath: string,
    file: string,
    content: string,
): Promise<WorkingFiles | null> {
    try {
        const yaml = load(content.replace('{{appname}}', '<app>')) as
            | NaisSchema
            | GithubActionsSchema
            | NaisTopicSchema
            | NaisJobSchema

        const fileWithExtension =
            file
                .replace(absoluteRepoPath, '')
                // Remove only leading slashes
                .replace(/^\/+/, '') ?? raise("Filename doesn't make sense")
        if ('apiVersion' in yaml && yaml.kind === 'Application') {
            return {
                type: 'app',
                filename: fileWithExtension,
                absolutePath: file,
                application: yaml,
            } satisfies NaisApplication
        } else if ('apiVersion' in yaml && yaml.kind === 'Topic') {
            return { type: 'topic', filename: fileWithExtension, absolutePath: file, topic: yaml } satisfies NaisTopic
        } else if ('jobs' in yaml) {
            return {
                type: 'action',
                filename: fileWithExtension,
                absolutePath: file,
                repoUrl: `https://github.com/navikt/${absoluteRepoPath.split('/').slice(-1)}`,
                action: yaml,
            } satisfies GithubAction
        } else if (yaml.kind) {
            return {
                type: 'other',
                kind: yaml.kind,
                filename: fileWithExtension,
                absolutePath: file,
                isOther: true,
            } satisfies NaisOther
        } else {
            console.debug(`Not naiserator or workflow: ${file.split('/').slice(-4).join('/')}`)
            return null
        }
    } catch (e) {
        console.error('error', file, e)
        throw new Error(`Unable to parse ${file}`, { cause: e })
    }
}
