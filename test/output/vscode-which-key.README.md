# vscode-which-key

## Commands

| Command         | Title                |
| --------------- | -------------------- |
| `whichkey.show` | Which Key: Show Menu |

## Configuration

| Key                               | Description                                                                 | Type      | Default          |
| --------------------------------- | --------------------------------------------------------------------------- | --------- | ---------------- |
| `whichkey.transient`              |                                                                             | `object`  | See package.json |
| `whichkey.delay`                  | Delay (in milliseconds) for which-key menu to display.                      | `number`  | `0`              |
| `whichkey.showIcons`              | Controls whether to show or hide icons in the which-key menu.               | `boolean` | `true`           |
| `whichkey.showButtons`            | Controls whether to show or hide buttons in the which-key menu.             | `boolean` | `true`           |
| `whichkey.useFullWidthCharacters` | Controls whether to use full width characters as key in the which-key menu. | `boolean` | `false`          |
| `whichkey.sortOrder`              | Controls the sorting order of the which-key menu items.                     | `string`  | `"none"`         |
| `whichkey.bindings`               | The bindings of the which key menu                                          | `array`   | See package.json |
| `whichkey.bindingOverrides`       | Overrides bindings of the (default) which key                               | `array`   | ``               |