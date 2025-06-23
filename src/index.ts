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

function getConfigObject(packageJson: any) {
  return (Array.isArray(packageJson.contributes?.configuration)
    ? packageJson.contributes?.configuration?.[0]?.properties
    : packageJson.contributes?.configuration?.properties
  ) || {}
}

export function generateMarkdown(packageJson: any) {
  const MAX_TABLE_COL_CHAR = 150

  function markdownEscape(text: string) {
    return text
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('|', '&vert;')
  }

  let commandsTable = [
    ['Command', 'Title'],
  ]

  let configsTable = [
    ['Key', 'Description', 'Type', 'Default'],
  ]

  let languagesTable = [
    ['Language', 'Extension', 'Grammars', 'Snippets'],
  ]

  let customEditorsTable = [
    ['Custom Editor', 'priority', 'filenamePattern'],
  ]

  let chatParticipantsTable = [
    ['Chat Participant', 'FullName', 'Description', 'Commands'],
  ]

  if (packageJson.contributes?.commands?.length) {
    commandsTable.push(
      ...packageJson.contributes.commands.map((c: any) => {
        return [
          `\`${c.command}\``,
          markdownEscape(c.category
            ? `${c.category}: ${c.title}`
            : c.title),
        ]
      }),
    )
  }
  else {
    commandsTable = []
  }

  const configsObject = getConfigObject(packageJson)

  if (Object.keys(configsObject || {}).length) {
    configsTable.push(
      ...Object.entries(configsObject)
        .map(([key, value]: any) => {
          const defaultVal = defaultValFromSchema(value) || ''
          return [
            `\`${key}\``,
            markdownEscape(value?.description || value?.markdownDescription || ''),
            `\`${String(value.type)}\``,
            defaultVal.length < MAX_TABLE_COL_CHAR ? `\`${defaultVal}\`` : 'See package.json',
          ]
        }),
    )
  }
  else {
    configsTable = []
  }

  if (packageJson.contributes?.languages?.length) {
    const snippets = packageJson.contributes.snippets.reduce((acc: any, snippet: any) => {
      acc[snippet.language] = snippet.language && snippet.path
      return acc
    }, {})
    const grammars = packageJson.contributes.grammars.reduce((acc: any, grammar: any) => {
      acc[grammar.language] = grammar.language && grammar.path && grammar.scopeName
      return acc
    }, {})
    languagesTable.push(
      ...packageJson.contributes.languages.map((l: any) => {
        return [l.id, l.label, grammars[l.id], snippets[l.id]]
      }),
    )
  }
  else {
    languagesTable = []
  }

  if (packageJson.contributes?.customEditors?.length) {
    customEditorsTable.push(
      ...packageJson.contributes.customEditors.map((c: any) => {
        return [c.viewType, c.priority, c.selector?.map((s: any) => s.filenamePattern).join(', ')]
      }),
    )
  }
  else {
    customEditorsTable = []
  }

  if (packageJson.contributes?.chatParticipants?.length) {
    chatParticipantsTable.push(
      ...packageJson.contributes.chatParticipants.map((c: any) => {
        return [c.id, c.fullName || '', c.description || '', c.commands?.map((cmd: any) => cmd.name).join(', ') || '']
      }),
    )
  }
  else {
    chatParticipantsTable = []
  }

  return {
    commandsTable: formatTable(commandsTable),
    configsTable: formatTable(configsTable),
    languagesTable: formatTable(languagesTable),
    customEditorsTable: formatTable(customEditorsTable),
    chatParticipantsTable: formatTable(chatParticipantsTable),
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
  // ========== languages ==========

  if (packageJson.contributes?.languages?.length) {
    lines.push(
      '',
      ...commentBlock(`Type union of all languages`),
      'export type LanguageKey = ',
      ...(packageJson.contributes?.languages || []).map((l: any) =>
        `  | ${JSON.stringify(l.id)}`,
      ),
    )
    lines.push(
      '',
      ...commentBlock(`Languages map registed by \`${extensionId}\``),
      'export const languages = {',
      ...(packageJson.contributes?.languages || []).map((l: any) =>
        `  ${convertCase(l.id)}: ${JSON.stringify(l.id)},`,
      ),
      '} satisfies Record<string, LanguageKey>',
    )
  }

  // ========== customEditors ==========

  if (packageJson.contributes?.customEditors?.length) {
    lines.push(
      '',
      ...commentBlock(`Type union of all customEditors`),
      'export type CustomEditorKey = ',
      ...(packageJson.contributes?.customEditors || []).map((c: any) =>
        `  | ${JSON.stringify(c.viewType)}`,
      ),
    )
    lines.push(
      '',
      ...commentBlock(`CustomEditors map registed by \`${extensionId}\``),
      'export const customEditors = {',
      ...(packageJson.contributes?.customEditors || []).map((c: any) =>
        `  ${convertCase(c.viewType)}: ${JSON.stringify(c.viewType)},`,
      ),
      '} satisfies Record<string, CustomEditorKey>',
    )
  }

  // ========== chatParticipants ==========

  if (packageJson.contributes?.chatParticipants?.length) {
    lines.push(
      '',
      ...commentBlock(`Type union of all chatParticipants`),
      'export type ChatParticipantKey = ',
      ...(packageJson.contributes?.chatParticipants || []).map((c: any) =>
        `  | ${JSON.stringify(c.id)}`,
      ),
    )
    lines.push(
      '',
      'export interface ChatParticipantTypeMap {',
      ...(packageJson.contributes?.chatParticipants || []).flatMap((c: any) =>
        [
          `  ${JSON.stringify(c.id)}: ${c.commands ? (c.commands)?.map((cmd: any) => `\n   | ${JSON.stringify(cmd.name)}`).join('') : undefined}`,
        ],
      ),
      '}',
    )

    lines.push(
      '',
      'export type ChatParticipantItem<T extends keyof ChatParticipantTypeMap> = ChatParticipantTypeMap[T]',
    )
    lines.push(
      '',
      ...commentBlock(`ChatParticipants map registed by \`${extensionId}\``),
      'export const chatParticipants = {',
      ...(packageJson.contributes?.chatParticipants || []).flatMap((c: any) =>
        [
          ...commentBlock([
            c.name,
            `@fullName \`${c.fullName}\``,
            `@description \`${c.description}\``,
            `@id \`${c.id}\``,
          ].join('\n'), 2),
          `  ${convertCase(c.id)}: ${JSON.stringify(c.id)},`,
        ],
      ),
      '} satisfies Record<string, ChatParticipantKey>',
    )
    lines.push(
      '',
      'export const chatParticipantCommandsMap = {',
      ...(packageJson.contributes?.chatParticipants || []).flatMap((c: any) =>
        c.commands
          ? [
              `  ${convertCase(c.id)}: {`,
              ...c.commands.flatMap((cmd: any) => {
                return [
                  ...commentBlock([
                    cmd.name,
                    `@description \`${cmd.description}\``,
                  ].join('\n'), 2),
                  `  ${convertCase(cmd.name)}: ${JSON.stringify(cmd.name)},`,
                ]
              }),
              `  } satisfies Record<string, ChatParticipantItem<"${c.id}">>,`,
            ]
          : null,
      ),
      '}',
    )
  }

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
    'export interface ConfigShorthandTypeMap {',
    ...Object.entries(configsObject)
      .flatMap(([key, value]: any) => {
        return [
          `  ${convertCase(withoutExtensionPrefix(key))}: ${typeFromSchema(value)},`,
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
    ...commentBlock(`Configs map registered by \`${extensionId}\``),
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
        return `    ${JSON.stringify(withoutExtensionPrefix(key))}: ${defaultValFromSchema(value)},`
      }),
    `  } satisfies ScopedConfigKeyTypeMap,`,
    `}`,
    '',
  )

  // ========== Nested ==========
  const nestedConfig: any = {}
  const isConfigMap = Symbol('isConfigMap')
  Object.entries(configsObject).forEach(([key, value]) => {
    const path = key.split('.')
    let target = nestedConfig
    for (const key of path.slice(0, -1)) {
      target = target[key] ||= {
        [isConfigMap]: true,
      }
    }
    const lastKey = path[path.length - 1]
    target[lastKey] = value
  })

  function generateNestedConfig([key, objOrValue]: any, depth: number, isType: boolean) {
    const indent = '  '.repeat(depth)
    if (objOrValue[isConfigMap]) {
      lines.push(`${indent}${JSON.stringify(key)}: {`)
      for (const entry of Object.entries(objOrValue)) {
        generateNestedConfig(entry, depth + 1, isType)
      }
      lines.push(`${indent}},`)
    }
    else {
      const value = isType ? typeFromSchema(objOrValue) : 0
      lines.push(`${indent}${JSON.stringify(key)}: ${value},`)
    }
  }
  lines.push(`export interface NestedConfigs {`)
  for (const entry of Object.entries(nestedConfig)) {
    generateNestedConfig(entry, 1, true)
  }
  lines.push(`}`, '')

  lines.push(`export interface NestedScopedConfigs {`)
  for (const entry of Object.entries(nestedConfig[extensionScope] || {})) {
    generateNestedConfig(entry, 1, true)
  }
  lines.push(`}`, '')

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
            const isRequired = schema.required?.includes(key)
            const optionalChar = isRequired ? '' : '?'
            return `'${key}'${optionalChar}: ${typeFromSchema(value, true)}`
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
      colChars[idx] = Math.max(colChars[idx], col?.length || 0)
    })
  })

  table.forEach((row, rowIdx) => {
    row.forEach((col, colIdx) => {
      table[rowIdx][colIdx] = col?.padEnd(colChars[colIdx], ' ') || ''
    })
  })

  return [
    `| ${header.join(' | ')} |`,
    `| ${colChars.map(w => '-'.repeat(w)).join(' | ')} |`,
    ...body.map(row => `| ${row.join(' | ')} |`),
  ].join('\n')
}
