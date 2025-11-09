import type { GenerateOptions, GenerateResult } from './types'
import { readFile } from 'node:fs/promises'
import { basename, resolve } from 'node:path'
import process from 'node:process'
import { glob } from 'tinyglobby'

interface LocaleOptions extends GenerateOptions, GenerateResult {}

export async function processLocale(options: LocaleOptions): Promise<GenerateResult> {
  const { cwd = process.cwd(), locale = 'en' } = options
  const files = await glob(`package.nls.*.json`, {
    cwd,
    onlyFiles: true,
  })
  if (!files.length)
    return { dts: options.dts, markdown: options.markdown }

  const choices = files.map(file => basename(file, '.json').replace('package.nls.', ''))
  if (choices.includes(locale))
    return await applyLocaleStrings({ locale, ...options })
  else
    throw new Error(`${locale} locale not found, available locales: ${choices.join(', ')}`)
}

async function applyLocaleStrings(options: LocaleOptions): Promise<GenerateResult> {
  const filepath = resolve(options.cwd ?? process.cwd(), `package.nls.${options.locale}.json`)
  const messages: Record<string, string> = JSON.parse(await readFile(filepath, 'utf-8'))

  let replacedDts = options.dts
  Object.entries(messages).forEach(([msgKey, msgValue]: [string, string]) => {
    const regex = new RegExp(`%${msgKey}%`, 'g')
    replacedDts = replacedDts.replace(regex, msgValue)
    Object.entries(options.markdown).forEach(([key, content]) => {
      options.markdown[key as keyof typeof options.markdown] = content.replace(regex, msgValue)
    })
  })

  return { dts: replacedDts, markdown: options.markdown }
}
