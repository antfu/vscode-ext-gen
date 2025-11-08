import type { GenerateOptions, Manifest } from './types'
import { generateDTS } from './dts'
import { processLocale } from './i18n'
import { generateMarkdown } from './markdown'
import { defaultValFromSchema } from './schema'
import { formatTable } from './utils'

export async function generate(packageJson: Manifest, options: GenerateOptions = {}) {
  const dts = generateDTS(packageJson, options)
  const markdown = generateMarkdown(packageJson)
  return await processLocale({ ...options, dts, markdown })
}

export {
  defaultValFromSchema,
  formatTable,
  generateDTS,
  generateMarkdown,
}

export * from './types'
