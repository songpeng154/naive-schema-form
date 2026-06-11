import type { Plugin } from 'vue'
import type { NaiveSchemaFormConfig } from '@/config/types'
import { NAIVE_SCHEMA_FORM_CONFIG_KEY } from '@/global.ts'

/**
 * Create a Vue plugin that installs global defaults for grid and schema-form components.
 *
 * @param config App-level defaults merged on top of the library defaults.
 * @returns A Vue plugin that provides the resolved config to all descendants.
 */
export function createNaiveSchemaForm(config: NaiveSchemaFormConfig = {}): Plugin {
  return {
    install(app) {
      app.provide(NAIVE_SCHEMA_FORM_CONFIG_KEY, config)
    },
  }
}
