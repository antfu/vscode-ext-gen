import { defineConfig } from 'tsdown'

export default defineConfig ({
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli.ts',
  },
  exports: true,
  dts: true,
  inlineOnly: [
    'scule',
  ],
})
