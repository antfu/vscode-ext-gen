import { defaultValFromSchema, getConfigObject } from './schema'
import { formatList, formatTable, markdownEscape } from './utils'

export function generateMarkdown(packageJson: any) {
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
    const snippets = (packageJson.contributes.snippets || []).reduce((acc: any, snippet: any) => {
      if (snippet.language) {
        acc[snippet.language] ||= []
        acc[snippet.language].push(snippet.path)
      }
      return acc
    }, {})
    const grammars = (packageJson.contributes.grammars || []).reduce((acc: any, grammar: any) => {
      if (grammar.language) {
        acc[grammar.language] ||= []
        acc[grammar.language].push(grammar.scopeName || grammar.path)
      }
      return acc
    }, {})
    languagesTable.push(
      ...packageJson.contributes.languages.map((l: any) => {
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
    commandsList: formatList(commandsTable),
    configsList: formatList(configsTable),
    languagesList: formatList(languagesTable),
    customEditorsList: formatList(customEditorsTable),
    chatParticipantsList: formatList(chatParticipantsTable),
  }
}
