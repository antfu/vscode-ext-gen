import fs from 'node:fs/promises'
import path from 'node:path'
import cac from 'cac'
import { version } from '../package.json'
import { generate } from '.'

const cli = cac()
  .version(version)

cli.command('[input]', 'Generate TypeScript files from package.json')
  .option('--output <output>', 'Output file', { default: 'src/generated-meta.ts' })
  .option('--namespace <namespace>', 'Generate with namespace')
  .option('--scope <scope>', 'The extension scope for commands and configs')
  .option('--docs <docs>', 'The docs location', { default: 'README.md' })
  .action(async (input = 'package.json', options) => {
    const json = JSON.parse(await fs.readFile(input, 'utf-8'))
    if (!json.publisher)
      throw new Error('This package.json does not seem to be a valid VSCode extension package.json')
    const { file, commandsDocs, configDocs } = await generate(json, {
      namespace: options.namespace === 'false' ? false : options.namespace,
      extensionScope: options.scope,
    })
    const outputDir = path.dirname(options.output)
    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(options.output, file, 'utf-8')

    let content = await fs.readFile(options.docs, 'utf-8')
    content = content.replace(/<!-- commands -->[\s\S]*<!-- commands -->/, `<!-- commands -->\n${commandsDocs}\n<!-- commands -->`)
    content = content.replace(/<!-- configuration -->[\s\S]*<!-- configuration -->/, `<!-- configuration -->\n${configDocs}\n<!-- configuration -->`)
    await fs.writeFile(options.doc, content, 'utf-8')
  })

cli.help()
cli.parse()
