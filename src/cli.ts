import fs from 'node:fs/promises'
import cac from 'cac'
import { version } from '../package.json'
import { generate } from '.'

const cli = cac()
  .version(version)

cli.command('[input]', 'Generate TypeScript files from package.json')
  .option('--output <output>', 'Output file', { default: 'src/generated-meta.ts' })
  .option('--namespace <namespace>', 'Generate with namespace')
  .option('--prefix <prefix>', 'Extension prefix name')
  .action(async (input = 'package.json', options) => {
    const json = JSON.parse(await fs.readFile(input, 'utf-8'))
    if (!json.publisher)
      throw new Error('This package.json does not seem to be a valid VSCode extension package.json')
    const file = await generate(json, {
      namespace: options.namespace === 'false' ? false : options.namespace,
      prefix: options.prefix,
    })
    await fs.writeFile(options.output, file, 'utf-8')
  })

cli.help()
cli.parse()
