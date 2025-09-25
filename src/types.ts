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
