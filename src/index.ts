import { camelCase } from 'scule'
import { assign, isArray } from 'radash'

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

function getConfigObject(packageJson: any): Record<string, any> {
  const conf = packageJson.contributes?.configuration
  return (isArray(conf)
    ? conf.reduce((acc, cur) => assign(acc, cur), {}).properties
    : packageJson.contributes?.configuration?.properties
  ) || {}
}

export function generateMarkdown(packageJson: any) {
  const MAX_TABLE_COL_CHAR = 150

  let commandsTable = [
    ['Command', 'Title'],
  ]

  let configsTable = [
    ['Key', 'Description', 'Type', 'Default'],
  ]

  if (packageJson.contributes?.commands.length) {
    commandsTable.push(
      ...packageJson.contributes.commands.map((c: any) => {
        return [
          `\`${c.command}\``,
          c.category
            ? `${c.category}: ${c.title}`
            : c.title,
        ]
      }),
    )
  }
  else {
    commandsTable = []
  }

  const configsObject = getConfigObject(packageJson)

  if (Object.keys(configsObject).length) {
    configsTable.push(
      ...Object.entries(configsObject)
        .map(([key, value]: any) => {
          const defaultVal = defaultValFromSchema(value) || ''
          return [
            `\`${key}\``,
            value?.description || '',
            `\`${String(value.type)}\``,
            defaultVal.length < MAX_TABLE_COL_CHAR ? `\`${defaultVal}\`` : 'See package.json',
          ]
        }),
    )
  }
  else {
    configsTable = []
  }

  return {
    commandsTable: formatTable(commandsTable),
    configsTable: formatTable(configsTable),
  }
}

export function generateDTS(packageJson: any, options: GenerateOptions = {}) {
  let {
    header = true,
    namespace = false,
    extensionScope = packageJson.name,
  } = options

  let lines: string[] = []

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
  const configsObject = getConfigObject(packageJson)

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
        const defaultValue = defaultValFromSchema(value)
        return [
          ...commentBlock([
            value.description,
            `@key \`${key}\``,
            `@default \`${defaultValue}\``,
            `@type \`${value.type}\``,
          ].join('\n'), 2),
          `  ${convertCase(name)}: {`,
          `    key: "${key}",`,
          `    default: ${defaultValue},`,
          `  } as ConfigItem<"${key}">,`,
        ]
      }),
    '}',
  )
  function genScoped(lines: string[], scopedConfigs: [string, any][], scope: string) {
    const scopeWithDot = `${scope}.`

    function removeScope(name: string) {
      if (name.startsWith(scopeWithDot)) {
        return name.slice(scopeWithDot.length)
      }
      return name
    }

    lines.push(
      ``,
      `export interface Scoped${convertCase(scope)}ConfigKeyTypeMap {`,
      ...scopedConfigs
        .map(([key, value]) => {
          return `  ${JSON.stringify(removeScope(key))}: ${typeFromSchema(value)},`
        }),
      '}',
      '',
      `export const scoped${convertCase(scope)}Configs = {`,
      `  scope: ${JSON.stringify(scope)},`,
      `  defaults: {`,
      ...scopedConfigs
        .map(([key, value]: any) => {
          return `    ${JSON.stringify(removeScope(key))}: ${defaultValFromSchema(value)},`
        }),
      `  } satisfies Scoped${convertCase(scope)}ConfigKeyTypeMap,`,
      `}`,
      '',
    )
  }

  // const scopedConfigs = Object.entries(configsObject)
  //   .filter(([key]) => key.startsWith(extensionScopeWithDot))
  // genScoped(lines, scopedConfigs, extensionScope)

  const scopeKeys = Array.from(Object.keys(configsObject).reduce((acc, curr) => {
    const parts = curr.split('.')
    if (parts.length > 0) {
      const scopeParts = parts.slice(0, -1)
      for (let i = 0; i < scopeParts.length; i++) {
        acc.add(scopeParts.slice(0, i + 1).join('.'))
      }
    }
    return acc
  }, new Set<string>()))

  const scopeConfPairs = scopeKeys.reduce((acc, scope) => {
    const conf = Object.entries(configsObject).filter(([key]) => key.startsWith(`${scope}.`))
    acc.set(scope, conf)
    return acc
  }, new Map<string, [string, any][]>())

  scopeConfPairs.forEach((conf, scope) => {
    genScoped(lines, conf, scope)
  })
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

export function generate(packageJson: any, options: GenerateOptions = {}) {
  return {
    dts: generateDTS(packageJson, options),
    markdown: generateMarkdown(packageJson),
  }
}

function commentBlock(text?: string, padding = 0): string[] {
  const indent = ' '.repeat(padding)
  if (!text) {
    return []
  }

  // Avoid premature closure of the comment block due to the presence of "*/" in the text
  const _text = text.replace(/\*\//g, '*\\/')

  return [
    `${indent}/**`,
    ..._text.split(/\n/g).map(l => `${indent} * ${l}`),
    `${indent} */`,
  ]
}

function typeFromSchema(schema: any, isSubType = false): string {
  if (!schema)
    return 'unknown'

  const schemaTypes = Array.isArray(schema.type) ? schema.type : [schema.type]
  const types: string[] = []

  for (const schemaType of schemaTypes) {
    switch (schemaType) {
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
        if (schema.properties) {
          const propertyKeyValues = Object.entries(schema.properties).map(([key, value]) => {
            return `'${key}': ${typeFromSchema(value, true)}`
          })

          types.push(`{ ${propertyKeyValues.join('; ')} }`)

          break
        }
        types.push('Record<string, unknown>')
        break
      default:
        types.push('unknown')
    }
  }

  if (!isSubType && schema.type !== 'object') {
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

export function defaultValFromSchema(schema: any): string | undefined {
  if (schema.type !== 'object')
    return JSON.stringify(schema.default)

  if ('default' in schema)
    return JSON.stringify(schema.default)

  if ('properties' in schema) {
    const keyValues = Object.entries(schema.properties).map(([key, value]): string => {
      return `${JSON.stringify(key)}: ${defaultValFromSchema(value)}`
    })

    return `{ ${keyValues.join(', ')} }`
  }

  return '{}'
}

export function formatTable(table: string[][]) {
  if (!table.length)
    return '**No data**'

  const [header, ...body] = table
  const colChars = Array.from<number>({ length: header.length }).fill(0)

  table.forEach((row) => {
    row.forEach((col, idx) => {
      colChars[idx] = Math.max(colChars[idx], col.length)
    })
  })

  table.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      table[rowIdx][colIdx] = col.padEnd(colChars[colIdx], ' ')
    })
  })

  return [
    `| ${header.join(' | ')} |`,
    `| ${colChars.map(w => '-'.repeat(w)).join(' | ')} |`,
    ...body.map(row => `| ${row.join(' | ')} |`),
  ].join('\n')
}
