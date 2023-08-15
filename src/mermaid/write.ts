import path from 'node:path'

/**
 * Just a stub
 */
export async function writeMermaid(mermaid: string, file: string): Promise<void> {
    await Bun.write(
        path.join(process.cwd(), file),
        `# Dependency graph
\`\`\`mermaid
${mermaid}
\`\`\`
`,
    )

    console.info(`Wrote graph to '${path.join(process.cwd(), 'graph.md')}'`)
}
