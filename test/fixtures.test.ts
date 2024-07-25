import fs from 'node:fs/promises'
import { basename } from 'node:path'
import { describe, expect, it } from 'vitest'
import fg from 'fast-glob'
import { generate } from '../src'

describe('fixtures', async () => {
  const dirs = await fg([
    './fixtures/*',
  ], { onlyDirectories: true })

  for (const dir of dirs) {
    it(basename(dir), async () => {
      const json = JSON.parse(await fs.readFile(`${dir}/package.json`, 'utf-8'))

      await expect(generate(json, {
        extensionScope: dir.includes('vscode-iconify-fork')
          ? 'iconify'
          : undefined,
      }))
        .toMatchFileSnapshot(`./output/${basename(dir)}.ts`)
    })
  }
})
