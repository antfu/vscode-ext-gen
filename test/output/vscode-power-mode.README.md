# vscode-power-mode

## Commands

| Command                      | Title              |
| ---------------------------- | ------------------ |
| `powermode.enablePowerMode`  | Enable Power Mode  |
| `powermode.disablePowerMode` | Disable Power Mode |

## Commands List

#### Enable Power Mode
Command                     : `powermode.enablePowerMode`  

#### Disable Power Mode
Command                     : `powermode.disablePowerMode`  

## Configuration

| Key                                     | Description                                                                                                                                                                                                          | Type        | Default       |
| --------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------- |
| ▿ <b>General</b>                        |
| `powermode.enabled`                     | Enable to activate POWER MODE!!!                                                                                                                                                                                     | `boolean`   | `false`       |
| `powermode.presets`                     | Choose between different preset gifs to use when powermode is activated                                                                                                                                              | `string`    | `"particles"` |
| ▿ <b>Combo</b>                          |
| `powermode.combo.location`              | Control where all the combo information is visible.                                                                                                                                                                  | `string`    | `"default"`   |
| `powermode.combo.threshold`             | The combo number needed to activate POWER MODE!!! and start shaking and exploding the screen! If the value is 0, POWER MODE will always be active.                                                                   | `number`    | `0`           |
| `powermode.combo.timeout`               | The number of seconds before the combo resets. If the value is 0, the timer will never reset.                                                                                                                        | `number`    | `10`          |
| `powermode.combo.counterEnabled`        | Control whether the combo counter is visible.                                                                                                                                                                        | `string`    | `"default"`   |
| `powermode.combo.counterSize`           | Control the size of the Combo Meter text                                                                                                                                                                             | `number`    | `3`           |
| `powermode.combo.timerEnabled`          | Control whether the combo timer is visible.                                                                                                                                                                          | `string`    | `"default"`   |
| ▿ <b>Shake</b>                          |
| `powermode.shake.enabled`               | Set to false to disable shaking while typing                                                                                                                                                                         | `boolean`   | `true`        |
| `powermode.shake.intensity`             | The intensity with which the screen shakes                                                                                                                                                                           | `number`    | `3`           |
| ▿ <b>Explosions</b>                     |
| `powermode.explosions.enabled`          | Set to false to disable explosions while typing                                                                                                                                                                      | `boolean`   | `true`        |
| `powermode.explosions.maxExplosions`    | The maximum number of simultaneous explosions                                                                                                                                                                        | `number`    | `1`           |
| `powermode.explosions.size`             | The size of the explosions. For value X, the height is set to X rem and the width to X ch                                                                                                                            | `number`    | `6`           |
| `powermode.explosions.frequency`        | The number of key strokes needed to trigger an explosion. 2 means every second keystroke will explode, 1 means every key stroke.                                                                                     | `number`    | `2`           |
| `powermode.explosions.offset`           | The vertical offset of the explosions. Increasing it will move the explosions up, decreasing it will move them down.                                                                                                 | `number`    | `0.35`        |
| `powermode.explosions.customExplosions` | This value will go into the 'url()' part of a background image. It should be a base64 encoded gif or **https** URL _without_ quotes.                                                                                 | `array`     | `[]`          |
| `powermode.explosions.backgroundMode`   | Affects the css properties used to display the gif.                                                                                                                                                                  | `string`    | `"mask"`      |
| `powermode.explosions.gifMode`          | Control the 'playback' mode of the gifs.                                                                                                                                                                             | `string`    | `"continue"`  |
| `powermode.explosions.explosionOrder`   | Determines how the explosions are cycled. 'random' (default) picks from the list randomly. 'sequential' goes through the list in order, and a number will select the explosion at that (zero based)index in the list | `undefined` | `"random"`    |
| `powermode.explosions.duration`         | Determines how long an explosion lasts (in milliseconds). Set to 0 for it to last forever.                                                                                                                           | `number`    | `1000`        |
| `powermode.explosions.customCss`        | Set custom CSS that will apply to the explosion element.                                                                                                                                                             | `object`    | `{}`          |
| ▿ <b>Deprecated</b>                     |
| `powermode.comboThreshold`              |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.comboTimeout`                |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.enableComboCounter`          |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.enableComboTimer`            |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.enableStatusBarComboCounter` | Set to false to disable showing the combo in the statusbar                                                                                                                                                           | `undefined` | `null`        |
| `powermode.enableStatusBarComboTimer`   | Set to false to disable showing the timer in the statusbar                                                                                                                                                           | `undefined` | `null`        |
| `powermode.enableShake`                 |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.shakeIntensity`              |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.explosionSize`               |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.explosionFrequency`          |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.explosionOffset`             |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.customExplosions`            |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.backgroundMode`              |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.gifMode`                     |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.explosionOrder`              |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.explosionDuration`           |                                                                                                                                                                                                                      | `undefined` | `null`        |
| `powermode.customCss`                   |                                                                                                                                                                                                                      | `undefined` | `null`        |

## Configuration List

### General

#### `powermode.enabled`
Description                                                                                                                                                                                                         : Enable to activate POWER MODE!!!  
Type       : `boolean`  
Default      : `false`  

#### `powermode.presets`
Description                                                                                                                                                                                                         : Choose between different preset gifs to use when powermode is activated  
Type       : `string`  
Default      : `"particles"`  

### Combo

#### `powermode.combo.location`
Description: Control where all the combo information is visible.  
Type: `string`  
Default: `"default"`  

#### `powermode.combo.threshold`
Description: The combo number needed to activate POWER MODE!!! and start shaking and exploding the screen! If the value is 0, POWER MODE will always be active.  
Type: `number`  
Default: `0`  

#### `powermode.combo.timeout`
Description: The number of seconds before the combo resets. If the value is 0, the timer will never reset.  
Type: `number`  
Default: `10`  

#### `powermode.combo.counterEnabled`
Description: Control whether the combo counter is visible.  
Type: `string`  
Default: `"default"`  

#### `powermode.combo.counterSize`
Description: Control the size of the Combo Meter text  
Type: `number`  
Default: `3`  

#### `powermode.combo.timerEnabled`
Description: Control whether the combo timer is visible.  
Type: `string`  
Default: `"default"`  

### Shake

#### `powermode.shake.enabled`
Description: Set to false to disable shaking while typing  
Type: `boolean`  
Default: `true`  

#### `powermode.shake.intensity`
Description: The intensity with which the screen shakes  
Type: `number`  
Default: `3`  

### Explosions

#### `powermode.explosions.enabled`
Description: Set to false to disable explosions while typing  
Type: `boolean`  
Default: `true`  

#### `powermode.explosions.maxExplosions`
Description: The maximum number of simultaneous explosions  
Type: `number`  
Default: `1`  

#### `powermode.explosions.size`
Description: The size of the explosions. For value X, the height is set to X rem and the width to X ch  
Type: `number`  
Default: `6`  

#### `powermode.explosions.frequency`
Description: The number of key strokes needed to trigger an explosion. 2 means every second keystroke will explode, 1 means every key stroke.  
Type: `number`  
Default: `2`  

#### `powermode.explosions.offset`
Description: The vertical offset of the explosions. Increasing it will move the explosions up, decreasing it will move them down.  
Type: `number`  
Default: `0.35`  

#### `powermode.explosions.customExplosions`
Description: This value will go into the 'url()' part of a background image. It should be a base64 encoded gif or **https** URL _without_ quotes.  
Type: `array`  
Default: `[]`  

#### `powermode.explosions.backgroundMode`
Description: Affects the css properties used to display the gif.  
Type: `string`  
Default: `"mask"`  

#### `powermode.explosions.gifMode`
Description: Control the 'playback' mode of the gifs.  
Type: `string`  
Default: `"continue"`  

#### `powermode.explosions.explosionOrder`
Description: Determines how the explosions are cycled. 'random' (default) picks from the list randomly. 'sequential' goes through the list in order, and a number will select the explosion at that (zero based)index in the list  
Type: `undefined`  
Default: `"random"`  

#### `powermode.explosions.duration`
Description: Determines how long an explosion lasts (in milliseconds). Set to 0 for it to last forever.  
Type: `number`  
Default: `1000`  

#### `powermode.explosions.customCss`
Description: Set custom CSS that will apply to the explosion element.  
Type: `object`  
Default: `{}`  

### Deprecated

#### `powermode.comboThreshold`
Type: `undefined`  
Default: `null`  

#### `powermode.comboTimeout`
Type: `undefined`  
Default: `null`  

#### `powermode.enableComboCounter`
Type: `undefined`  
Default: `null`  

#### `powermode.enableComboTimer`
Type: `undefined`  
Default: `null`  

#### `powermode.enableStatusBarComboCounter`
Description: Set to false to disable showing the combo in the statusbar  
Type: `undefined`  
Default: `null`  

#### `powermode.enableStatusBarComboTimer`
Description: Set to false to disable showing the timer in the statusbar  
Type: `undefined`  
Default: `null`  

#### `powermode.enableShake`
Type: `undefined`  
Default: `null`  

#### `powermode.shakeIntensity`
Type: `undefined`  
Default: `null`  

#### `powermode.explosionSize`
Type: `undefined`  
Default: `null`  

#### `powermode.explosionFrequency`
Type: `undefined`  
Default: `null`  

#### `powermode.explosionOffset`
Type: `undefined`  
Default: `null`  

#### `powermode.customExplosions`
Type: `undefined`  
Default: `null`  

#### `powermode.backgroundMode`
Type: `undefined`  
Default: `null`  

#### `powermode.gifMode`
Type: `undefined`  
Default: `null`  

#### `powermode.explosionOrder`
Type: `undefined`  
Default: `null`  

#### `powermode.explosionDuration`
Type: `undefined`  
Default: `null`  

#### `powermode.customCss`
Type: `undefined`  
Default: `null`  