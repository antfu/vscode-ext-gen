import fs from 'node:fs/promises'
import path from 'node:path'
import cac from 'cac'
import { generate } from '.'
import { version } from '../package.json'

const cli = cac()
  .version(version)

cli.command('[input]', 'Generate TypeScript files from package.json')
  .option('--output <output>', 'Output file', { default: 'src/generated-meta.ts' })
  .option('--namespace <namespace>', 'Generate with namespace')
  .option('--scope <scope>', 'The extension scope for commands and configs')
  .option('--readme <path>', 'The path to README.md', { default: 'README.md' })
  .action(async (input = 'package.json', options) => {
    const json = JSON.parse(await fs.readFile(input, 'utf-8'))
    if (!json.publisher)
      throw new Error('This package.json does not seem to be a valid VSCode extension package.json')

    const { dts, markdown } = generate(json, {
      namespace: options.namespace === 'false' ? false : options.namespace,
      extensionScope: options.scope,
    })
    const outputDir = path.dirname(options.output)
    await fs.mkdir(outputDir, { recursive: true })
    await fs.writeFile(options.output, dts, 'utf-8')

    if (options.readme && options.readme !== 'false') {
      const raw = await fs.readFile(options.readme, 'utf-8')

      const content = raw
        .replace(/<!-- (commands|commands-table) -->[\s\S]*?<!-- (commands|commands-table) -->/, `<!-- $1 -->\n\n${markdown.commandsTable}\n\n<!-- $2 -->`)
        .replace(/<!-- (configs|configs-table) -->[\s\S]*?<!-- (configs|configs-table) -->/, `<!-- $1 -->\n\n${markdown.configsTable}\n\n<!-- $2 -->`)
        .replace(/<!-- (languages|languages-table) -->[\s\S]*?<!-- (languages|languages-table) -->/, `<!-- $1 -->\n\n${markdown.languagesTable}\n\n<!-- $2 -->`)
        .replace(/<!-- (customEditors|customEditors-table) -->[\s\S]*?<!-- (customEditors|customEditors-table) -->/, `<!-- $1 -->\n\n${markdown.customEditorsTable}\n\n<!-- $2 -->`)
        .replace(/<!-- (chatParticipants|chatParticipants-table) -->[\s\S]*?<!-- (chatParticipants|chatParticipants-table) -->/, `<!-- $1 -->\n\n${markdown.chatParticipantsTable}\n\n<!-- $2 -->`)

        // lists
        .replace(/<!-- (commands-list) -->[\s\S]*?<!-- (commands-list) -->/, `<!-- $1 -->\n\n${markdown.commandsList}\n\n<!-- $2 -->`)
        .replace(/<!-- (configs-list) -->[\s\S]*?<!-- (configs-list) -->/, `<!-- $1 -->\n\n${markdown.configsList}\n\n<!-- $2 -->`)
        .replace(/<!-- (languages-list) -->[\s\S]*?<!-- (languages-list) -->/, `<!-- $1 -->\n\n${markdown.languagesList}\n\n<!-- $2 -->`)
        .replace(/<!-- (customEditors-list) -->[\s\S]*?<!-- (customEditors-list) -->/, `<!-- $1 -->\n\n${markdown.customEditorsList}\n\n<!-- $2 -->`)
        .replace(/<!-- (chatParticipants-list) -->[\s\S]*?<!-- (chatParticipants-list) -->/, `<!-- $1 -->\n\n${markdown.chatParticipantsList}\n\n<!-- $2 -->`)

      if (raw === content && !raw.includes('<!-- commands') && !raw.includes('<!-- configs')) {
        console.log('Add `<!-- commands --><!-- commands -->` and `<!-- configs --><!-- configs -->` to your README.md to insert commands and configurations table')
        console.log('Or use `<!-- commands-table -->` for table format, `<!-- commands-list -->` for list format')
      }
      else {
        await fs.writeFile(options.readme, content, 'utf-8')
      }
    }
  })

cli.help()
cli.parse()
