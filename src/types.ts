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

export interface ConfigTable {
  title: string
  tableData: string[][]
}

export interface Manifest {
  [key: string]: unknown
  name: string
  contributes?: {
    languages?: Language[]
    snippets?: Snippet[]
    grammars?: Grammar[]
    customEditors?: CustomEditor[]
    chatParticipants?: ChatParticipant[]
    commands?: Command[]
    configuration?: Configuration | Configuration[]
  }
}

export interface Language {
  [key: string]: unknown
  id: string
  extensions?: string[]
}

export interface Snippet {
  language: string
  path: string
}

export interface Grammar {
  language: string
  scopeName?: string
  path?: string
}

export interface CustomEditor {
  viewType: string
  displayName?: string
  priority: number | string
  selector?: {
    filenamePattern: string
  }[]
}

export interface ChatParticipant {
  id: string
  name: string
  fullName?: string
  description?: string
  isSticky?: boolean
  commands?: { name: string, description?: string }[]
}

export interface Command {
  command: string
  title: string
  category?: string
  icon?: string | Record<'light' | 'dark', string>
}

export interface Configuration {
  title: string
  type?: 'object'
  order?: number
  properties?: Record<string, Property>
}

export interface Property {
  [key: string]: unknown
  type: 'boolean' | 'number' | 'string' | 'array' | 'object'
  description?: string
  markdownDescription?: string
  default?: unknown
  required?: string[]
  enum?: string[]
  // array
  items?: Property
  // object
  properties?: Record<string, Property>
}
