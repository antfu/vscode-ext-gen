# vscode-smart-clicks

## Commands

| Command               | Title                 |
| --------------------- | --------------------- |
| `smartClicks.trigger` | Smart Clicks: Trigger |

## Commands List

#### Smart Clicks: Trigger
Command              : `smartClicks.trigger`  

## Configuration

| Key                           | Description                                                                             | Type     | Default                   |
| ----------------------------- | --------------------------------------------------------------------------------------- | -------- | ------------------------- |
| `smartClicks.clicksInterval`  | The interval between clicks in milliseconds.                                            | `number` | `600`                     |
| `smartClicks.triggerDelay`    | The delay after triggering the selection. To prevent conflicting with normal selection. | `number` | `150`                     |
| `smartClicks.htmlLanguageIds` | Array of language IDs to enable html smartClicks                                        | `array`  | `["html","vue","svelte"]` |
| `smartClicks.rules`           | Rule toggles                                                                            | `object` | See package.json          |

## Configuration List

#### `smartClicks.clicksInterval`
Description                                                                            : The interval between clicks in milliseconds.  
Type    : `number`  
Default                  : `600`  

#### `smartClicks.triggerDelay`
Description                                                                            : The delay after triggering the selection. To prevent conflicting with normal selection.  
Type    : `number`  
Default                  : `150`  

#### `smartClicks.htmlLanguageIds`
Description                                                                            : Array of language IDs to enable html smartClicks  
Type    : `array`  
Default                  : `["html","vue","svelte"]`  

#### `smartClicks.rules`
Description                                                                            : Rule toggles  
Type    : `object`  
Default                  : See package.json  