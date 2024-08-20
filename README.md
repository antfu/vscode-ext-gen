# vscode-ext-gen

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![bundle][bundle-src]][bundle-href]
[![JSDocs][jsdocs-src]][jsdocs-href]
[![License][license-src]][license-href]

Generate TypeScript meta info and Markdown tables for VS Code extension from package.json

## Usage

```bash
npx vscode-ext-gen
```

Under the VS Code extension project root

## Continuous Update

We recommend using the [Run on Save](https://marketplace.visualstudio.com/items?itemName=emeraldwalk.RunOnSave) extension with the following config in your `.vscode/settings.json` to always generate the meta file on save:

```json
{
  "emeraldwalk.runonsave": {
    "commands": [
      {
        "match": "package.json",
        "isAsync": true,
        "cmd": "npm run update"
      }
    ]
  }
}
```

## Examples

Generates `src/generated-meta.ts` file with the following content which syncs with your `package.json`:

```ts
export namespace ExtensionMeta {
  // Meta info
  export const publisher = 'antfu'
  export const name = 'iconify'
  export const version = '0.8.1'
  export const displayName = 'Iconify IntelliSense'
  export const description = 'Intelligent Iconify previewing and searching for VS Code'
  export const extensionId = `${publisher}.${name}`

  /**
   * Type union of all commands
   */
  export type CommandKey =
    | 'iconify.toggle-annotations'
    | 'iconify.clear-cache'
    // ...

  /**
   * Commands map registed by `antfu.iconify`
   */
  export const commands = {
    /**
     * Toggle Annotations
     * @value `iconify.toggle-annotations`
     */
    toggleAnnotations: 'iconify.toggle-annotations',
    // ...
  } satisfies Record<string, CommandId>

  /**
   * Type union of all configs
   */
  export type ConfigKey =
    | 'iconify.annotations'
    | 'iconify.position'
    // ...

  export interface ConfigKeyTypeMap {
    'iconify.annotations': boolean
    'iconify.position': ('before' | 'after')
    // ...
  }

  export interface ConfigMeta<T extends keyof ConfigKeyTypeMap> {
    key: T
    default: ConfigKeyTypeMap[T]
  }

  /**
   * Configs map registed by `antfu.iconify`
   */
  export const configs = {
    /**
     * Enabled Iconify inline annotations
     * @key `iconify.annotations`
     * @default `true`
     * @type `boolean`
     */
    annotations: {
      key: 'iconify.annotations',
      default: true,
    } as ConfigMeta<'iconify.annotations'>,
    /**
     * Position the icon before or after the icon name
     * @key `iconify.position`
     * @default `"before"`
     * @type `string`
     */
    position: {
      key: 'iconify.position',
      default: 'before',
    } as ConfigMeta<'iconify.position'>,

    // ...
  }
}

export default ExtensionMeta
```

On usage:

```ts
import { commands, workspace } from 'vscode'
import * as meta from './generated-meta'

export function activate() {
  console.log(meta.displayName, meta.extensionId)

  const config = workspace
    .getConfiguration()
    .get(meta.configs.position.key, meta.configs.position.default)

  commands.registerCommand(meta.commands.toggleAnnontations, () => {
    // ...
  })
}
```

For a full example, check [this file](./test/output/vscode-iconify.ts)

## Generate Docs

Add comments `<!-- commands -->` and `<!-- configs -->` as the slots in your README.md:

```md
# Your Extension

## Commands

<!-- commands -->
<!-- commands -->

## Configurations

<!-- configs -->
<!-- configs -->
```

They will be replaced with the generated tables when you run `npx vscode-ext-gen`.

## Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/antfu/static/sponsors.svg'/>
  </a>
</p>

## License

[MIT](./LICENSE) License © 2023-PRESENT [Anthony Fu](https://github.com/antfu)

<!-- Badges -->

[npm-version-src]: https://img.shields.io/npm/v/vscode-ext-gen?style=flat&colorA=080f12&colorB=1fa669
[npm-version-href]: https://npmjs.com/package/vscode-ext-gen
[npm-downloads-src]: https://img.shields.io/npm/dm/vscode-ext-gen?style=flat&colorA=080f12&colorB=1fa669
[npm-downloads-href]: https://npmjs.com/package/vscode-ext-gen
[bundle-src]: https://img.shields.io/bundlephobia/minzip/vscode-ext-gen?style=flat&colorA=080f12&colorB=1fa669&label=minzip
[bundle-href]: https://bundlephobia.com/result?p=vscode-ext-gen
[license-src]: https://img.shields.io/github/license/antfu/vscode-ext-gen.svg?style=flat&colorA=080f12&colorB=1fa669
[license-href]: https://github.com/antfu/vscode-ext-gen/blob/main/LICENSE
[jsdocs-src]: https://img.shields.io/badge/jsdocs-reference-080f12?style=flat&colorA=080f12&colorB=1fa669
[jsdocs-href]: https://www.jsdocs.io/package/vscode-ext-gen
