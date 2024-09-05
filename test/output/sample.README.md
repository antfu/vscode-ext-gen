# sample

## Commands

| Command                     | Title                        |
| --------------------------- | ---------------------------- |
| `sample.toggle-annotations` | sample: Toggle Annotations   |
| `sample.toggle-inplace`     | sample: Toggle In-place Mode |
| `sample.clear-cache`        | sample: Clear icon cache     |

## Configuration

| Key                                | Description                                                             | Type      | Default                                                                                                     |
| ---------------------------------- | ----------------------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------- |
| `sample.inplace`                   | Use icon graph to replace the icon name.                                | `boolean` | `true`                                                                                                      |
| `sample.annotations`               | Enabled sample inline annotations                                       | `boolean` | `true`                                                                                                      |
| `sample.position`                  | Position the icon before or after the icon name                         | `string`  | `"before"`                                                                                                  |
| `sample.color`                     | Icon color hex for inline displaying                                    | `string`  | `"auto"`                                                                                                    |
| `sample.delimiters`                | Delimiters for separating between collection id and icon id             | `array`   | `[":","--","-","/"]`                                                                                        |
| `sample.prefixes`                  | Prefixes for matching                                                   | `array`   | `["","i-","~icons/"]`                                                                                       |
| `sample.suffixes`                  | Suffixes for matching                                                   | `array`   | `["","i-"]`                                                                                                 |
| `sample.languageIds`               | Array of language IDs to enable annotations                             | `array`   | `["javascript","javascriptreact","typescript","typescriptreact","vue","svelte","html","pug","json","yaml"]` |
| `sample.includes`                  | Collection IDs to be included for detection                             | `array`   | `null`                                                                                                      |
| `sample.excludes`                  | Collection IDs to be excluded for detection                             | `array`   | `null`                                                                                                      |
| `sample.cdnEntry`                  | CDN entry of sample icon-sets                                           | `string`  | `"https://icones.js.org/collections"`                                                                       |
| `sample.customCollectionJsonPaths` | JSON paths for custom collection                                        | `array`   | `[]`                                                                                                        |
| `sample.customCollectionIdsMap`    | Collection IDs Map for collection name alias, e.g. { 'mc': 'mingcute' } | `object`  | `{}`                                                                                                        |
| `sample.customAliasesJsonPaths`    | JSON paths for custom aliases                                           | `array`   | `[]`                                                                                                        |
| `sample.customAliasesOnly`         | Only use the icon aliases. Non aliased icons will be ignored.           | `boolean` | `false`                                                                                                     |