import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'tsdown'

export default defineConfig([
  {
    entry: ['./src/index.ts'],
    platform: 'neutral',
    fromVite: true,
    deps: {
      neverBundle: ['vue', 'naive-ui', '@iconify/vue'],
    },
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
    dts: {
      vue: true,
    },
  },
])
