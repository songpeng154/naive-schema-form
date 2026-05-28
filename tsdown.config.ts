import { defineConfig } from 'tsdown'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    fromVite: true,
    deps: {
      neverBundle: ['vue', 'naive-ui'],
    },
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dts: {
      vue: true,
    },
  },
])
