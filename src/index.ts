import type { GenerateOptions } from './types'
import { generateDTS } from './dts'
import { generateMarkdown } from './markdown'
import { defaultValFromSchema } from './schema'

export function generate(packageJson: any, options: GenerateOptions = {}) {
  return {
    dts: generateDTS(packageJson, options),
    markdown: generateMarkdown(packageJson),
  }
}

export { defaultValFromSchema, generateDTS, generateMarkdown, type GenerateOptions }
