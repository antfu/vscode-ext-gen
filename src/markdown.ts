import type { ChatParticipant, CustomEditor, Grammar, Language, Manifest, Property, Snippet } from './types'
import { defaultValFromSchema, getConfigObject } from './schema'
import { formatList, formatTable, markdownEscape } from './utils'

export function generateMarkdown(packageJson: Manifest) {
  const MAX_TABLE_COL_CHAR = 150

  let commandsTable = [
    ['Command', 'Title'],
  ]

  let configsTable = [
    ['Key', 'Description', 'Type', 'Default'],
  ]

  let languagesTable = [
    ['Language', 'Extensions', 'Grammars', 'Snippets'],
  ]

  let customEditorsTable = [
    ['Custom Editor', 'priority', 'filenamePattern'],
  ]

  let chatParticipantsTable = [
    ['Chat Participant', 'FullName', 'Description', 'Commands'],
  ]

  if (packageJson.contributes?.commands?.length) {
    commandsTable.push(
      ...packageJson.contributes.commands.map((c) => {
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
        .map(([key, value]: [string, Property]) => {
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
    const snippets = (packageJson.contributes.snippets || []).reduce((acc: Record<string, string[]>, snippet: Snippet) => {
      if (snippet.language) {
        acc[snippet.language] ||= []
        acc[snippet.language].push(snippet.path)
      }
      return acc
    }, {})
    const grammars = (packageJson.contributes.grammars || []).reduce((acc: Record<string, string[]>, grammar: Grammar) => {
      if (grammar.language) {
        acc[grammar.language] ||= []
        acc[grammar.language].push((grammar.scopeName || grammar.path)!)
      }
      return acc
    }, {})
    languagesTable.push(
      ...packageJson.contributes.languages.map((l: Language) => {
        const grammarList = grammars[l.id] ? grammars[l.id].join(', ') : '-'
        const snippetList = snippets[l.id] ? snippets[l.id].join(', ') : '-'
        const extensions = l.extensions ? l.extensions.join(', ') : '-'
        return [
          `\`${l.id}\``,
          extensions,
          grammarList,
          snippetList,
        ]
      }),
    )
  }
  else {
    languagesTable = []
  }

  if (packageJson.contributes?.customEditors?.length) {
    customEditorsTable.push(
      ...packageJson.contributes.customEditors.map((c: CustomEditor) => {
        const data: string[] = []
        if (c.viewType)
          data.push(c.viewType)
        if (c.priority || c.priority === 0)
          data.push(String(c.priority))
        if (c.selector)
          data.push(c.selector.map(s => s.filenamePattern).join(', '))
        return data
      }),
    )
  }
  else {
    customEditorsTable = []
  }

  if (packageJson.contributes?.chatParticipants?.length) {
    chatParticipantsTable.push(
      ...packageJson.contributes.chatParticipants.map((c: ChatParticipant) => {
        return [c.id, c.fullName || '', c.description || '', c.commands?.map(cmd => cmd.name).join(', ') || '']
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
    commandsList: formatList(commandsTable),
    configsList: formatList(configsTable),
    languagesList: formatList(languagesTable),
    customEditorsList: formatList(customEditorsTable),
    chatParticipantsList: formatList(chatParticipantsTable),
  }
}
