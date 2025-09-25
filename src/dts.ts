import type { GenerateOptions } from './types'
import { defaultValFromSchema, getConfigObject, typeFromSchema } from './schema'
import { commentBlock, convertCase } from './utils'

const forwardKeys = [
  'publisher',
  'name',
  'version',
  'displayName',
  'description',
]

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
      'export type CommandKey =',
      ...(packageJson.contributes?.commands || []).map((c: any) =>
        `  | ${JSON.stringify(c.command)}`,
      ),
    )
  }

  lines.push(
    '',
    ...commentBlock(`Commands map registered by \`${extensionId}\``),
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
      'export type LanguageKey =',
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
      'export type CustomEditorKey =',
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
      'export type ChatParticipantKey =',
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
      'export type ConfigKey =',
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
