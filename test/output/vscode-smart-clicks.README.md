# vscode-smart-clicks

## Commands

| Command               | Title                 |
| --------------------- | --------------------- |
| `smartClicks.trigger` | Smart Clicks: Trigger |

## Configuration

| Key                           | Description                                                                             | Type     | Default                   |
| ----------------------------- | --------------------------------------------------------------------------------------- | -------- | ------------------------- |
| `smartClicks.clicksInterval`  | The interval between clicks in milliseconds.                                            | `number` | `600`                     |
| `smartClicks.triggerDelay`    | The delay after triggering the selection. To prevent conflicting with normal selection. | `number` | `150`                     |
| `smartClicks.htmlLanguageIds` | Array of language IDs to enable html smartClicks                                        | `array`  | `["html","vue","svelte"]` |
| `smartClicks.rules`           | Rule toggles                                                                            | `object` | See package.json          |