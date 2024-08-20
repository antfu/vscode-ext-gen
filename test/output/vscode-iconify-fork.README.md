# vscode-iconify-fork

## Commands

| Command                      | Title                         |
| ---------------------------- | ----------------------------- |
| `iconify.toggle-annotations` | Iconify: Toggle Annotations   |
| `iconify.toggle-inplace`     | Iconify: Toggle In-place Mode |
| `iconify.clear-cache`        | Iconify: Clear icon cache     |

## Configuration

| Key                                 | Description                                                             | Type      | Default                                                                                                     |
| ----------------------------------- | ----------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `iconify.inplace`                   | Use icon graph to replace the icon name.                                | `boolean` | `true`                                                                                                      |
| `iconify.annotations`               | Enabled Iconify inline annotations                                      | `boolean` | `true`                                                                                                      |
| `iconify.position`                  | Position the icon before or after the icon name                         | `string`  | `"before"`                                                                                                  |
| `iconify.color`                     | Icon color hex for inline displaying                                    | `string`  | `"auto"`                                                                                                    |
| `iconify.delimiters`                | Delimiters for separating between collection id and icon id             | `array`   | `[":","--","-","/"]`                                                                                        |
| `iconify.prefixes`                  | Prefixes for matching                                                   | `array`   | `["","i-","~icons/"]`                                                                                       |
| `iconify.suffixes`                  | Suffixes for matching                                                   | `array`   | `["","i-"]`                                                                                                 |
| `iconify.languageIds`               | Array of language IDs to enable annotations                             | `array`   | `["javascript","javascriptreact","typescript","typescriptreact","vue","svelte","html","pug","json","yaml"]` |
| `iconify.includes`                  | Collection IDs to be included for detection                             | `array`   | `null`                                                                                                      |
| `iconify.excludes`                  | Collection IDs to be excluded for detection                             | `array`   | `null`                                                                                                      |
| `iconify.cdnEntry`                  | CDN entry of iconify icon-sets                                          | `string`  | `"https://icones.js.org/collections"`                                                                       |
| `iconify.customCollectionJsonPaths` | JSON paths for custom collection                                        | `array`   | `[]`                                                                                                        |
| `iconify.customCollectionIdsMap`    | Collection IDs Map for collection name alias, e.g. { 'mc': 'mingcute' } | `object`  | `{}`                                                                                                        |
| `iconify.customAliasesJsonPaths`    | JSON paths for custom aliases                                           | `array`   | `[]`                                                                                                        |
| `iconify.customAliasesOnly`         | Only use the icon aliases. Non aliased icons will be ignored.           | `boolean` | `false`                                                                                                     |