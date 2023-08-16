import path from 'node:path'
import prettier from 'prettier'

/**
 * Just a stub
 */
export async function writeMermaid(mermaid: string, file: string): Promise<void> {
    const filename = path.join(process.cwd(), file)

    const content = createMermaidMarkdownWrapper(mermaid)
    const formatted = await prettier.format(content, { parser: 'markdown' })
    await Bun.write(filename, formatted)

    console.info(`Wrote graph to '${path.join(process.cwd(), 'graph.md')}'`)
}

function createMermaidMarkdownWrapper(mermaid: string) {
    return `
# Dependency graph
\`\`\`mermaid
${mermaid}
\`\`\`
`
}
