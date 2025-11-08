# vscode-iconify-fork

## Commands

| Command                      | Title                         |
| ---------------------------- | ----------------------------- |
| `iconify.toggle-annotations` | Iconify: Toggle Annotations   |
| `iconify.toggle-inplace`     | Iconify: Toggle In-place Mode |
| `iconify.clear-cache`        | Iconify: Clear icon cache     |

## Commands List

#### Iconify: Toggle Annotations
Command                     : `iconify.toggle-annotations`  

#### Iconify: Toggle In-place Mode
Command                     : `iconify.toggle-inplace`  

#### Iconify: Clear icon cache
Command                     : `iconify.clear-cache`  

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

## Configuration List

#### `iconify.inplace`
Description                                                            : Use icon graph to replace the icon name.  
Type     : `boolean`  
Default                                                                                                    : `true`  

#### `iconify.annotations`
Description                                                            : Enabled Iconify inline annotations  
Type     : `boolean`  
Default                                                                                                    : `true`  

#### `iconify.position`
Description                                                            : Position the icon before or after the icon name  
Type     : `string`  
Default                                                                                                    : `"before"`  

#### `iconify.color`
Description                                                            : Icon color hex for inline displaying  
Type     : `string`  
Default                                                                                                    : `"auto"`  

#### `iconify.delimiters`
Description                                                            : Delimiters for separating between collection id and icon id  
Type     : `array`  
Default                                                                                                    : `[":","--","-","/"]`  

#### `iconify.prefixes`
Description                                                            : Prefixes for matching  
Type     : `array`  
Default                                                                                                    : `["","i-","~icons/"]`  

#### `iconify.suffixes`
Description                                                            : Suffixes for matching  
Type     : `array`  
Default                                                                                                    : `["","i-"]`  

#### `iconify.languageIds`
Description                                                            : Array of language IDs to enable annotations  
Type     : `array`  
Default                                                                                                    : `["javascript","javascriptreact","typescript","typescriptreact","vue","svelte","html","pug","json","yaml"]`  

#### `iconify.includes`
Description                                                            : Collection IDs to be included for detection  
Type     : `array`  
Default                                                                                                    : `null`  

#### `iconify.excludes`
Description                                                            : Collection IDs to be excluded for detection  
Type     : `array`  
Default                                                                                                    : `null`  

#### `iconify.cdnEntry`
Description                                                            : CDN entry of iconify icon-sets  
Type     : `string`  
Default                                                                                                    : `"https://icones.js.org/collections"`  

#### `iconify.customCollectionJsonPaths`
Description                                                            : JSON paths for custom collection  
Type     : `array`  
Default                                                                                                    : `[]`  

#### `iconify.customCollectionIdsMap`
Description                                                            : Collection IDs Map for collection name alias, e.g. { 'mc': 'mingcute' }  
Type     : `object`  
Default                                                                                                    : `{}`  

#### `iconify.customAliasesJsonPaths`
Description                                                            : JSON paths for custom aliases  
Type     : `array`  
Default                                                                                                    : `[]`  

#### `iconify.customAliasesOnly`
Description                                                            : Only use the icon aliases. Non aliased icons will be ignored.  
Type     : `boolean`  
Default                                                                                                    : `false`  