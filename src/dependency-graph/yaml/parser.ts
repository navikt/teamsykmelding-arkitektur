import { load } from 'js-yaml'
import { compact } from 'remeda'

import { NaisSchema } from './schemas/nais-schema.ts'
import { GithubActionsSchema } from './schemas/gha-schema.ts'
import { raise } from '../../utils.ts'

export type OtherNaisResource = [name: string]
export type NaisSchemaTuple = [name: string, file: NaisSchema]
export type WorkingFiles = NaisSchemaTuple | GithubActionsSchema | OtherNaisResource

export async function parseYaml(file: string): Promise<(WorkingFiles | null)[]> {
    const content = await Bun.file(file).text()

    return await Promise.all(compact(content.split('---')).map((section) => parseYamlDocument(file, section)))
}

async function parseYamlDocument(file: string, content: string): Promise<WorkingFiles | null> {
    try {
        const yaml = load(content.replace('{{appname}}', '<app>')) as NaisSchema | GithubActionsSchema

        if ('apiVersion' in yaml && yaml.kind === 'Application') {
            // Should be a nais schema
            return [file.split('/').at(-1) ?? raise("Filename doesn't make sense"), yaml]
        } else if ('jobs' in yaml) {
            // Should be a github workflow schema
            return yaml
        } else if (yaml.kind) {
            return [file.split('/').at(-1) ?? raise("Filename doesn't make sense")]
        } else {
            console.debug(`Not naiserator or workflow: ${file.split('/').slice(-4).join('/')}`)
            return null
        }
    } catch (e) {
        console.error('error', file, e)
        throw new Error(`Unable to parse ${file}`, { cause: e })
    }
}
