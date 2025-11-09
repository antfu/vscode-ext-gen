import fs from 'node:fs/promises'
import { basename } from 'node:path'
import { glob } from 'tinyglobby'
import { describe, expect, it } from 'vitest'
import { generate } from '../src'

describe('fixtures', async () => {
  const dirs = await glob('./fixtures/*', { onlyDirectories: true })

  for (const dir of dirs) {
    it(basename(dir), async () => {
      const json = JSON.parse(await fs.readFile(`${dir}/package.json`, 'utf-8'))

      let extensionScope: string | undefined
      let locale: string[] | undefined

      try {
        if (dir.includes('vscode-iconify-fork'))
          return extensionScope = 'iconify'

        if (dir.includes('vscode-smart-clicks'))
          return extensionScope = 'smartClicks'

        if (dir.includes('vscode-pets'))
          return locale = ['en', 'zh-cn', 'ja']
      }
      finally {
        const process = async (locale?: string) => {
          const filename = locale ? `${basename(dir)}.${locale}` : `${basename(dir)}`

          const { dts, markdown } = await generate(json, { cwd: dir, extensionScope, locale })
          await expect(dts).toMatchFileSnapshot(`./output/${filename}.ts`)

          const readmeLines = [
            `# ${basename(filename)}`,
            '',
            '## Commands',
            '',
            markdown.commandsTable,
            '',
            '## Commands List',
            '',
            markdown.commandsList,
            '',
            '## Configuration',
            '',
            markdown.configsTable,
            '',
            '## Configuration List',
            '',
            markdown.configsList,
          ]
          await expect(readmeLines.join('\n')).toMatchFileSnapshot(`./output/${basename(filename)}.README.md`)
        }

        if (locale?.length) {
          for (const l of locale) {
            await process(l)
          }
        }
        else {
          await process()
        }
      }
    })
  }
})
