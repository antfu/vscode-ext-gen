import { pascalCase } from 'scule'

const forwardKeys = [
  'publisher',
  'name',
  'version',
  'displayName',
  'description',
]

export interface GenerateOptions {
  /**
   * The header of the generated file
   */
  header?: string | boolean
  /**
   * Use namespace for generated types
   * @default false
   */
  namespace?: string | boolean
}

export function generate(packageJson: any, options: GenerateOptions = {}) {
  let {
    header = true,
    namespace = false,
  } = options

  let lines: string[] = [
  ]

  lines.push('// Meta info')

  for (const key of forwardKeys) {
    lines.push(`export const ${key} = ${packageJson[key] ? JSON.stringify(packageJson[key]) : 'undefined'}`)
  }

  lines.push(
    // eslint-disable-next-line no-template-curly-in-string
    'export const extensionName = `${publisher}.${name}`',
  )

  const extensionPrefix = `${packageJson.name}.`
  const extensionName = `${packageJson.publisher}.${packageJson.name}`

  function withoutExtensionPrefix(name: string) {
    if (name.startsWith(extensionPrefix)) {
      return name.slice(extensionPrefix.length)
    }
    return name
  }

  // ========== Commands ==========

  lines.push(
    '',
    ...generateCommentBlock('Type union of all commands'),
  )
  if (!packageJson.contributes?.commands?.length) {
    lines.push('export type CommandId = never')
  }
  else {
    lines.push(
      'export type CommandId = ',
      ...(packageJson.contributes?.commands || []).map((c: any) =>
      `  | ${JSON.stringify(c.command)}`,
      ),
    )
  }

  lines.push(
    '',
    ...generateCommentBlock(`Commands map registed by \`${extensionName}\``),
    'export const commands = {',
    ...(packageJson.contributes?.commands || [])
      .flatMap((c: any) => {
        const name = withoutExtensionPrefix(c.command)
        return [
          ...generateCommentBlock(`${c.title}\n@value \`${c.command}\``, 2),
          `  ${pascalCase(name)}: ${JSON.stringify(c.command)},`,
        ]
      }),
    '} satisfies Record<string, CommandId>',
  )

  // ========== Configs ==========

  const configurationObject = packageJson.contributes?.configuration?.properties || {}

  lines.push(
    '',
    ...generateCommentBlock('Type union of all configurations'),
  )
  if (!Object.keys(configurationObject).length) {
    lines.push('export type ConfigurationId = never')
  }
  else {
    lines.push(
      'export type ConfigurationId = ',
      ...Object.keys(configurationObject).map(c =>
      `  | "${c}"`,
      ),
    )
  }

  lines.push(
    '',
    ...generateCommentBlock(`Configs map registed by \`${extensionName}\``),
    'export const configurations = {',
    ...Object.entries(configurationObject)
      .flatMap(([key, value]: any) => {
        const name = withoutExtensionPrefix(key)
        return [
          ...generateCommentBlock([
            value.description,
            `@key \`${key}\``,
            `@default \`${JSON.stringify(value.default)}\``,
            `@type \`${value.type}\``,
          ].join('\n'), 2),
          `  ${pascalCase(name)}: "${key}",`,
        ]
      }),
    '} satisfies Record<string, ConfigurationId>',
  )

  lines.push(
    '',
    'export const configurationsDefaults = {',
    ...Object.entries(configurationObject)
      .flatMap(([key, value]: any) => {
        return [
          `  ${JSON.stringify(key)}: ${JSON.stringify(value.default)},`,
        ]
      }),
    '} satisfies { [key in ConfigurationId]: ConfigurationTypeMap[key] | null | undefined }',
  )

  lines.push(
    '',
    'export interface ConfigurationTypeMap {',
    ...Object.entries(configurationObject)
      .flatMap(([key, value]: any) => {
        return [
          `  ${JSON.stringify(key)}: ${typeFromSchema(value)},`,
        ]
      }),
    '}',
  )

  if (namespace) {
    if (namespace === true)
      namespace = 'ExtensionMeta'

    lines = lines.map(line => line ? `  ${line}` : line)
    lines.unshift(
      ...generateCommentBlock(`Extension Meta for \`${extensionName}\``, 0),
      `export namespace ${namespace} {`,
    )
    lines.push(
      '}',
      '',
      `export default ${namespace}`,
    )
  }

  if (header) {
    if (typeof header === 'string') {
      lines.unshift(header)
    }
    else {
      lines.unshift(
        '// This file is generated by `vscode-ext-gen`. Do not modify manually.',
        '// @see https://github.com/antfu/vscode-ext-gen',
        '',
      )
    }
  }

  lines.push('') // EOL
  return lines.join('\n')
}

function generateCommentBlock(text?: string, padding = 0): string[] {
  const indent = ' '.repeat(padding)
  if (!text) {
    return []
  }

  return [
    `${indent}/**`,
    ...text.split(/\n/g).map(l => `${indent} * ${l}`),
    `${indent} */`,
  ]
}

function typeFromSchema(schema: any): string {
  if (!schema)
    return 'unknown'
  switch (schema.type) {
    case 'boolean':
      return 'boolean'
    case 'string':
      if (schema.enum) {
        return `(${schema.enum.map((v: string) => JSON.stringify(v)).join(' | ')})`
      }
      return 'string'
    case 'number':
      return 'number'
    case 'array':
      if (schema.items) {
        return `${typeFromSchema(schema.items)}[]`
      }
      return 'unknown[]'
    case 'object':
      return 'Record<string, unknown>'
    default:
      return 'unknown'
  }
}
