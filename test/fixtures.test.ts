import fs from 'node:fs/promises'
import { basename } from 'node:path'
import { describe, expect, it } from 'vitest'
import fg from 'fast-glob'
import { generate } from '../src'

describe('fixtures', async () => {
  const dirs = await fg([
    './fixtures/*',
    '!./fixtures/forks',
  ], { onlyDirectories: true })

  for (const dir of dirs) {
    it(basename(dir), async () => {
      const json = JSON.parse(await fs.readFile(`${dir}/package.json`, 'utf-8'))

      await expect(generate(json))
        .toMatchFileSnapshot(`./output/${basename(dir)}.ts`)
    })
  }

  it('vscode-iconify-fork', async () => {
    const upstreamJson = JSON.parse(await fs.readFile('./fixtures/vscode-iconify/package.json', 'utf-8'))
    const json = JSON.parse(await fs.readFile('./fixtures/forks/vscode-iconify-fork/package.json', 'utf-8'))

    await expect(generate(json, { prefix: upstreamJson.name })).toMatchFileSnapshot('./output/vscode-iconify-fork.ts')
  })
})
