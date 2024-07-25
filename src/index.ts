import { camelCase } from 'scule'

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
  /**
   * The package scope for commands and configs.
   *
   * Default to the package name.
   *
   * Useful when your extension name has different prefix from the package name.
   */
  extensionScope?: string
}

function convertCase(input: string) {
  if (input.match(/^[a-z0-9$]*$/i) && !input.match(/^\d/)) // Valid JS identifier, keep as-is
    return input
  return camelCase(input)
}

export function generate(packageJson: any, options: GenerateOptions = {}) {
  let {
    header = true,
    namespace = false,
    extensionScope = packageJson.name,
  } = options

  let lines: string[] = [
  ]

  lines.push('// Meta info')

  for (const key of forwardKeys) {
    lines.push(`export const ${key} = ${packageJson[key] ? JSON.stringify(packageJson[key]) : 'undefined'}`)
  }

  lines.push(
    // eslint-disable-next-line no-template-curly-in-string
    'export const extensionId = `${publisher}.${name}`',
  )

  const extensionScopeWithDot = `${extensionScope}.`
  const extensionId = `${packageJson.publisher}.${packageJson.name}`

  function withoutExtensionPrefix(name: string) {
    if (name.startsWith(extensionScopeWithDot)) {
      return name.slice(extensionScopeWithDot.length)
    }
    return name
  }

  // ========== Commands ==========

  lines.push(
    '',
    ...commentBlock('Type union of all commands'),
  )
  if (!packageJson.contributes?.commands?.length) {
    lines.push('export type CommandKey = never')
  }
  else {
    lines.push(
      'export type CommandKey = ',
      ...(packageJson.contributes?.commands || []).map((c: any) =>
      `  | ${JSON.stringify(c.command)}`,
      ),
    )
  }

  lines.push(
    '',
    ...commentBlock(`Commands map registed by \`${extensionId}\``),
    'export const commands = {',
    ...(packageJson.contributes?.commands || [])
      .flatMap((c: any) => {
        const name = withoutExtensionPrefix(c.command)
        return [
          ...commentBlock(`${c.title}\n@value \`${c.command}\``, 2),
          `  ${convertCase(name)}: ${JSON.stringify(c.command)},`,
        ]
      }),
    '} satisfies Record<string, CommandKey>',
  )

  // ========== Configs ==========

  const configsObject = packageJson.contributes?.configuration?.properties || {}

  lines.push(
    '',
    ...commentBlock('Type union of all configs'),
  )
  if (!Object.keys(configsObject).length) {
    lines.push('export type ConfigKey = never')
  }
  else {
    lines.push(
      'export type ConfigKey = ',
      ...Object.keys(configsObject).map(c =>
      `  | "${c}"`,
      ),
    )
  }

  lines.push(
    '',
    'export interface ConfigKeyTypeMap {',
    ...Object.entries(configsObject)
      .flatMap(([key, value]: any) => {
        return [
          `  ${JSON.stringify(key)}: ${typeFromSchema(value)},`,
        ]
      }),
    '}',
  )

  lines.push(
    '',
    'export interface ConfigShorthandMap {',
    ...Object.entries(configsObject)
      .flatMap(([key]: any) => {
        return [
          `  ${convertCase(withoutExtensionPrefix(key))}: ${JSON.stringify(key)},`,
        ]
      }),
    '}',
  )

  lines.push(
    '',
    `export interface ConfigItem<T extends keyof ConfigKeyTypeMap> {`,
    `  key: T,`,
    `  default: ConfigKeyTypeMap[T],`,
    `}`,
    '',
  )

  lines.push(
    '',
    ...commentBlock(`Configs map registed by \`${extensionId}\``),
    'export const configs = {',
    ...Object.entries(configsObject)
      .flatMap(([key, value]: any) => {
        const name = withoutExtensionPrefix(key)
        return [
          ...commentBlock([
            value.description,
            `@key \`${key}\``,
            `@default \`${JSON.stringify(value.default)}\``,
            `@type \`${value.type}\``,
          ].join('\n'), 2),
          `  ${convertCase(name)}: {`,
          `    key: "${key}",`,
          `    default: ${JSON.stringify(value.default)},`,
          `  } as ConfigItem<"${key}">,`,
        ]
      }),
    '}',
  )

  const scopedConfigs = Object.entries(configsObject)
    .filter(([key]) => key.startsWith(extensionScopeWithDot))

  lines.push(
    '',
    'export interface ScopedConfigKeyTypeMap {',
    ...scopedConfigs
      .map(([key, value]) => {
        return `  ${JSON.stringify(withoutExtensionPrefix(key))}: ${typeFromSchema(value)},`
      }),
    '}',
    '',
    'export const scopedConfigs = {',
    `  scope: ${JSON.stringify(extensionScope)},`,
    `  defaults: {`,
    ...scopedConfigs
      .map(([key, value]: any) => {
        return `    ${JSON.stringify(withoutExtensionPrefix(key))}: ${JSON.stringify(value.default)},`
      }),
    `  } satisfies ScopedConfigKeyTypeMap,`,
    `}`,
    '',
  )

  // ========== Namespace ==========

  if (namespace) {
    if (namespace === true)
      namespace = 'ExtensionMeta'

    lines = lines.map(line => line ? `  ${line}` : line)
    lines.unshift(
      ...commentBlock(`Extension Meta for \`${extensionId}\``, 0),
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

function commentBlock(text?: string, padding = 0): string[] {
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

function typeFromSchema(schema: any, isSubType = false): string {
  if (!schema)
    return 'unknown'

  const types: string[] = []

  switch (schema.type) {
    case 'boolean':
      types.push('boolean')
      break
    case 'string':
      if (schema.enum) {
        types.push(...schema.enum.map((v: string) => JSON.stringify(v)))
        break
      }
      types.push('string')
      break
    case 'number':
      types.push('number')
      break
    case 'array':
      if (schema.items) {
        types.push(`${typeFromSchema(schema.items, true)}[]`)
        break
      }
      types.push('unknown[]')
      break
    case 'object':
      if (schema.items) {
        types.push(`Record<string, ${typeFromSchema(schema.items, true)}>`)
        break
      }
      types.push('Record<string, unknown>')
      break
    default:
      types.push('unknown')
  }

  if (!isSubType) {
    if (!('default' in schema) || schema.default === undefined)
      types.push('undefined')
    else if (schema.default === null)
      types.push('null')
  }

  if (types.length === 1)
    return types[0]
  else
    return `(${types.join(' | ')})`
}
