# i18n-ally

## Commands

| Command                                 | Title                                                               |
| --------------------------------------- | ------------------------------------------------------------------- |
| `i18n-ally.config-locales`              | %extname%: %command.config_locales%                                 |
| `i18n-ally.config-locales-auto`         | %extname%: %command.config_locales_auto%                            |
| `i18n-ally.config-display-language`     | %extname%: %command.config_display_language%                        |
| `i18n-ally.config-source-language`      | %extname%: %command.config_source_language%                         |
| `i18n-ally.set-display-language`        | %extname%: %command.set_display_language%                           |
| `i18n-ally.set-source-language`         | %extname%: %command.set_source_language%                            |
| `i18n-ally.copy-key`                    | %extname%: %command.copy_key%                                       |
| `i18n-ally.translate-key`               | %extname%: %command.translate_key%                                  |
| `i18n-ally.edit-key`                    | %extname%: %command.edit_key%                                       |
| `i18n-ally.open-key`                    | %extname%: %command.open_key%                                       |
| `i18n-ally.delete-key`                  | %extname%: %command.delete_key%                                     |
| `i18n-ally.rename-key`                  | %extname%: %command.rename_key%                                     |
| `i18n-ally.extract-text`                | %extname%: %refactor.extract_text%                                  |
| `i18n-ally.extract-hard-strings-batch`  | %extname%: Extract all hard-coded strings (experimental)            |
| `i18n-ally.detect_hard_strings`         | %extname%: Detect hard-coded strings in current file (experimental) |
| `i18n-ally.open-url`                    | %extname%: %command.open_url%                                       |
| `i18n-ally.fulfill-keys`                | %extname%: %command.fulfill_keys%                                   |
| `i18n-ally.refresh-usage`               | %extname%: %command.refresh_usage%                                  |
| `i18n-ally.support`                     | %extname%: %feedback.support%                                       |
| `i18n-ally.locale-visibility-show`      | %extname%: %command.locale_visibility_show%                         |
| `i18n-ally.locale-visibility-hide`      | %extname%: %command.locale_visibility_hide%                         |
| `i18n-ally.new-key`                     | %extname%: %command.new_key%                                        |
| `i18n-ally.duplicate-key`               | %extname%: %command.duplicate_key%                                  |
| `i18n-ally.mark-key-as-in-use`          | %extname%: %command.mark_key_as_in_use%                             |
| `i18n-ally.open-in-editor`              | %extname%: %command.open_in_editor%                                 |
| `i18n-ally.open-editor`                 | %extname%: %command.open_editor%                                    |
| `i18n-ally.review.comment`              | %extname%: %review.leave_comment%                                   |
| `i18n-ally.review.approve`              | %extname%: %review.approve%                                         |
| `i18n-ally.review.request-change`       | %extname%: %review.request_change%                                  |
| `i18n-ally.review.edit`                 | %extname%: %review.edit%                                            |
| `i18n-ally.review.resolve`              | %review.resolve%                                                    |
| `i18n-ally.review.resolve-thread`       | %extname%: %review.resolve_all%                                     |
| `i18n-ally.review.apply-translation`    | %extname%: %review.apply_translation_candidate%                     |
| `i18n-ally.review.apply-suggestion`     | %extname%: %review.apply_suggestion%                                |
| `i18n-ally.insert-key`                  | %extname%: %command.insert_key%                                     |
| `i18n-ally.deepl-usage`                 | %extname%: %command.deepl_usage%                                    |
| `i18n-ally.go-to-range`                 | %extname%: %command.go_to_range%                                    |
| `i18n-ally.go-to-next-usage`            | %extname%: %command.go_to_next_usage%                               |
| `i18n-ally.go-to-prev-usage`            | %extname%: %command.go_to_prev_usage%                               |
| `i18n-ally.open-docs-hard-string`       | %extname%: %command.show_docs%                                      |
| `i18n-ally.extract-disable-auto-detect` | %extname%: %command.extract.disable-auto-detect%                    |
| `i18n-ally.extract-enable-auto-detect`  | %extname%: %command.extract.enable-auto-detect%                     |

## Configuration

| Key                                            | Description                                                                                                                          | Type           | Default                              |
| ---------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------ | -------------- | ------------------------------------ |
| `i18n-ally.disabled`                           | %config.disabled%                                                                                                                    | `boolean`      | `false`                              |
| `i18n-ally.autoDetection`                      | %config.auto_detection%                                                                                                              | `boolean`      | `true`                               |
| `i18n-ally.localesPaths`                       | %config.locales_paths%                                                                                                               | `string,array` | ``                                   |
| `i18n-ally.encoding`                           | %config.encoding%                                                                                                                    | `string`       | `"utf-8"`                            |
| `i18n-ally.sourceLanguage`                     | %config.source_language%                                                                                                             | `string`       | ``                                   |
| `i18n-ally.displayLanguage`                    | %config.display_language%                                                                                                            | `string`       | ``                                   |
| `i18n-ally.ignoredLocales`                     | %config.ignored_locales%                                                                                                             | `array`        | ``                                   |
| `i18n-ally.keystyle`                           | %config.keystyle%                                                                                                                    | `string`       | ``                                   |
| `i18n-ally.dirStructure`                       | %config.dir_structure%                                                                                                               | `string`       | ``                                   |
| `i18n-ally.annotations`                        | %config.annotations%                                                                                                                 | `boolean`      | `true`                               |
| `i18n-ally.annotationInPlace`                  | %config.annotation_in_place%                                                                                                         | `boolean`      | `true`                               |
| `i18n-ally.annotationMaxLength`                | %config.annotation_max_length%                                                                                                       | `number`       | `40`                                 |
| `i18n-ally.annotationDelimiter`                | %config.annotation_delimiter%                                                                                                        | `string`       | `"·"`                                |
| `i18n-ally.includeSubfolders`                  | %config.include_subfolders%                                                                                                          | `boolean`      | `true`                               |
| `i18n-ally.fullReloadOnChanged`                | %config.full_reload_on_changed%                                                                                                      | `boolean`      | `false`                              |
| `i18n-ally.showFlags`                          | %config.show_flags%                                                                                                                  | `boolean`      | `true`                               |
| `i18n-ally.enabledFrameworks`                  | %config.enabled_frameworks%                                                                                                          | `array`        | ``                                   |
| `i18n-ally.enabledParsers`                     | %config.enabled_parsers%                                                                                                             | `array`        | ``                                   |
| `i18n-ally.keysInUse`                          | %config.keys_in_use%                                                                                                                 | `array`        | ``                                   |
| `i18n-ally.sortKeys`                           | %config.sort_keys%                                                                                                                   | `boolean`      | `false`                              |
| `i18n-ally.sortCompare`                        | %config.sort_compare%                                                                                                                | `string`       | `"binary"`                           |
| `i18n-ally.sortLocale`                         | %config.sort_locale%                                                                                                                 | `string`       | ``                                   |
| `i18n-ally.preferredDelimiter`                 | %config.preferred_delimiter%                                                                                                         | `string`       | `"-"`                                |
| `i18n-ally.readonly`                           | %config.readonly%                                                                                                                    | `boolean`      | `false`                              |
| `i18n-ally.keepFulfilled`                      | %config.keep_fulfill%                                                                                                                | `boolean`      | `false`                              |
| `i18n-ally.localeCountryMap`                   | %config.locale_country_map%                                                                                                          | `object`       | `{}`                                 |
| `i18n-ally.indent`                             | %config.indent%                                                                                                                      | `number`       | `2`                                  |
| `i18n-ally.disablePathParsing`                 | %config.disable_path_parsing%                                                                                                        | `boolean`      | `false`                              |
| `i18n-ally.tabStyle`                           | %config.tab_style%                                                                                                                   | `string`       | `"space"`                            |
| `i18n-ally.namespace`                          | %config.namespace%                                                                                                                   | `boolean`      | ``                                   |
| `i18n-ally.pathMatcher`                        | %config.path_matcher%                                                                                                                | `string`       | ``                                   |
| `i18n-ally.languageTagSystem`                  | %config.language_tag_system%                                                                                                         | `string`       | `"bcp47"`                            |
| `i18n-ally.ignoreFiles`                        | %config.ignore_files%                                                                                                                | `array`        | ``                                   |
| `i18n-ally.theme.annotation`                   |                                                                                                                                      | `string`       | `"rgba(153, 153, 153, .8)"`          |
| `i18n-ally.theme.annotationMissing`            |                                                                                                                                      | `string`       | `"rgba(153, 153, 153, .3)"`          |
| `i18n-ally.theme.annotationBorder`             |                                                                                                                                      | `string`       | `"rgba(153, 153, 153, .2)"`          |
| `i18n-ally.theme.annotationMissingBorder`      |                                                                                                                                      | `string`       | `"rgba(153, 153, 153, .2)"`          |
| `i18n-ally.regex.key`                          | %config.regex_key%                                                                                                                   | `string`       | ``                                   |
| `i18n-ally.regex.usageMatch`                   | %config.regex_usage_match%                                                                                                           | `array`        | ``                                   |
| `i18n-ally.regex.usageMatchAppend`             | %config.regex_usage_match_append%                                                                                                    | `array`        | ``                                   |
| `i18n-ally.refactor.templates`                 | %config.refactor_templates%                                                                                                          | `array`        | ``                                   |
| `i18n-ally.translate.saveAsCandidates`         | %config.translate_save_as_candidates%                                                                                                | `boolean`      | `false`                              |
| `i18n-ally.translate.fallbackToKey`            | %config.translate.fallbackToKey%                                                                                                     | `boolean`      | `false`                              |
| `i18n-ally.translate.engines`                  | %config.translate.engines%                                                                                                           | `array`        | `["google"]`                         |
| `i18n-ally.translate.parallels`                | %config.translate.parallels%                                                                                                         | `number`       | `5`                                  |
| `i18n-ally.translate.promptSource`             | %config.prompt_translating_source%                                                                                                   | `boolean`      | `false`                              |
| `i18n-ally.translate.overrideExisting`         | %config.translate_override_existing%                                                                                                 | `boolean`      | `false`                              |
| `i18n-ally.translate.google.apiKey`            | %config.google_api_key%                                                                                                              | `string`       | `null`                               |
| `i18n-ally.translate.deepl.apiKey`             | %config.deepl_api_key%                                                                                                               | `string`       | `null`                               |
| `i18n-ally.translate.baidu.appid`              | %config.baidu_appid%                                                                                                                 | `string`       | `null`                               |
| `i18n-ally.translate.baidu.apiSecret`          | %config.baidu_app_secret%                                                                                                            | `string`       | `null`                               |
| `i18n-ally.translate.deepl.enableLog`          | %config.deepl_log%                                                                                                                   | `boolean`      | `false`                              |
| `i18n-ally.translate.deepl.useFreeApiEntry`    | %config.deepl_use_free_api_entry%                                                                                                    | `boolean`      | `false`                              |
| `i18n-ally.translate.libre.apiRoot`            | %config.libretranslate_api_root%                                                                                                     | `string`       | `"http://localhost:5000"`            |
| `i18n-ally.translate.openai.apiKey`            | %config.openai_api_key%                                                                                                              | `string`       | `null`                               |
| `i18n-ally.translate.openai.apiRoot`           | %config.openai_api_root%                                                                                                             | `string`       | `"https://api.openai.com"`           |
| `i18n-ally.translate.openai.apiModel`          | %config.openai_api_model%                                                                                                            | `string`       | `"gpt-3.5-turbo"`                    |
| `i18n-ally.usage.scanningIgnore`               | %config.usage.scanning_ignore%                                                                                                       | `array`        | ``                                   |
| `i18n-ally.usage.derivedKeyRules`              | %config.derived_keys%                                                                                                                | `array`        | `null`                               |
| `i18n-ally.frameworks.ruby-rails.scopeRoot`    |                                                                                                                                      | `string`       | `"app/views"`                        |
| `i18n-ally.parsers.typescript.tsNodePath`      |                                                                                                                                      | `string`       | `"node_modules/ts-node/dist/bin.js"` |
| `i18n-ally.parsers.typescript.compilerOptions` |                                                                                                                                      | `object`       | `{}`                                 |
| `i18n-ally.parsers.extendFileExtensions`       |                                                                                                                                      | `object`       | `{}`                                 |
| `i18n-ally.review.enabled`                     | %config.review_enabled%                                                                                                              | `boolean`      | `true`                               |
| `i18n-ally.review.gutters`                     | %config.review_gutters%                                                                                                              | `boolean`      | `true`                               |
| `i18n-ally.review.user.name`                   | %config.review_username%                                                                                                             | `string`       | ``                                   |
| `i18n-ally.review.user.email`                  | %config.review_email%                                                                                                                | `string`       | ``                                   |
| `i18n-ally.review.removeCommentOnResolved`     | %config.review_remove_on_resolved%                                                                                                   | `boolean`      | `false`                              |
| `i18n-ally.editor.preferEditor`                | %config.editor_prefer_editor%                                                                                                        | `boolean`      | `false`                              |
| `i18n-ally.extract.keygenStrategy`             | %config.keygen_strategy%                                                                                                             | `string`       | `"slug"`                             |
| `i18n-ally.extract.keygenStyle`                | %config.keygen_style%                                                                                                                | `string`       | `"default"`                          |
| `i18n-ally.extract.keyPrefix`                  | %config.key_prefix%                                                                                                                  | `string`       | `""`                                 |
| `i18n-ally.extract.keyMaxLength`               | %config.key_max_length%                                                                                                              | `number`       | `null`                               |
| `i18n-ally.extract.targetPickingStrategy`      | %config.target_picking_strategy%                                                                                                     | `string`       | `"none"`                             |
| `i18n-ally.extract.parsers.html`               | Parser options for extracting HTML, see https://github.com/lokalise/i18n-ally/blob/master/src/extraction/parsers/options.ts          | `object`       | `{}`                                 |
| `i18n-ally.extract.parsers.babel`              | Parser options for extracting JS/TS/JSX/TSX, see https://github.com/lokalise/i18n-ally/blob/master/src/extraction/parsers/options.ts | `object`       | `{}`                                 |
| `i18n-ally.extract.autoDetect`                 | Enables hard-coded strings detection automatically whenever opening a supported file                                                 | `boolean`      | `false`                              |
| `i18n-ally.extract.ignored`                    | Strings to be ignored on hard-coded strings detection                                                                                | `array`        | ``                                   |
| `i18n-ally.extract.ignoredByFiles`             | Strings to be ignored on hard-coded strings detection, by files                                                                      | `object`       | `{}`                                 |
| `i18n-ally.parserOptions`                      |                                                                                                                                      | `object`       | `{}`                                 |
| `i18n-ally.defaultNamespace`                   | %config.default_namespace%                                                                                                           | `string`       | ``                                   |
| `i18n-ally.derivedKeyRules`                    |                                                                                                                                      | `undefined`    | ``                                   |
| `i18n-ally.filenameMatchRegex`                 |                                                                                                                                      | `undefined`    | ``                                   |
| `i18n-ally.fileNamespace`                      |                                                                                                                                      | `undefined`    | ``                                   |
| `i18n-ally.keyMatchRegex`                      |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.localesPaths`                   |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.encoding`                       |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.sourceLanguage`                 |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.displayLanguage`                |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.ignoredLocales`                 |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.keystyle`                       |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.dirStructure`                   |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.annotations`                    |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.annotationMaxLength`            |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.annotationDelimiter`            |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.filenameMatchRegex`             |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.includeSubfolders`              |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.fullReloadOnChanged`            |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.sortKeys`                       |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.preferredDelimiter`             |                                                                                                                                      | `undefined`    | ``                                   |
| `vue-i18n-ally.readonly`                       |                                                                                                                                      | `undefined`    | ``                                   |