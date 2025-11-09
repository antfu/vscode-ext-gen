import type { GenerateOptions, GenerateResult } from './types'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'
import { glob } from 'tinyglobby'

export async function processLocale(options: GenerateOptions, generateResult: GenerateResult): Promise<GenerateResult> {
  const { cwd = process.cwd(), locale = 'en' } = options
  const files = await glob(`package.nls.*.json`, {
    cwd,
    onlyFiles: true,
  })

  const choices = files.map(file => path.basename(file, '.json').replace('package.nls.', ''))
  if (choices.includes(locale))
    return await applyLocaleStrings(options, generateResult)
  else
    throw new Error(`${locale} locale not found, available locales: ${choices.join(', ')}`)
}

async function applyLocaleStrings(options: GenerateOptions, generateResult: GenerateResult): Promise<GenerateResult> {
  const filepath = path.resolve(options.cwd ?? process.cwd(), `package.nls.${options.locale}.json`)
  const messages: Record<string, string> = JSON.parse(await fs.readFile(filepath, 'utf-8'))

  let replacedDts = generateResult.dts
  Object.entries(messages).forEach(([msgKey, msgValue]: [string, string]) => {
    const regex = new RegExp(`%${msgKey}%`, 'g')
    replacedDts = replacedDts.replace(regex, msgValue)
    Object.entries(generateResult.markdown).forEach(([key, content]) => {
      generateResult.markdown[key as keyof typeof generateResult.markdown] = content.replace(regex, msgValue)
    })
  })

  return { dts: replacedDts, markdown: generateResult.markdown }
}
