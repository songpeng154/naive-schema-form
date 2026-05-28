import type { Plugin } from 'vue'
import type { NaiveSchemaFormConfig } from '@/config/types'
import { NAIVE_SCHEMA_FORM_CONFIG_KEY } from '@/config/context'
import { resolveNaiveSchemaFormConfig } from '@/config/utils'

/**
 * Create a Vue plugin that installs global defaults for grid and schema-form components.
 *
 * @param config App-level defaults merged on top of the library defaults.
 * @returns A Vue plugin that provides the resolved config to all descendants.
 */
export function createNaiveSchemaForm(config: NaiveSchemaFormConfig = {}): Plugin {
  const resolved = resolveNaiveSchemaFormConfig(config)

  return {
    install(app) {
      app.provide(NAIVE_SCHEMA_FORM_CONFIG_KEY, resolved)
    },
  }
}

/**
 * Define a config object with full type inference in userland code.
 *
 * @param config App-level defaults for the plugin or manual provider.
 * @returns The same config object, preserving its inferred type shape.
 */
export function defineNaiveSchemaFormConfig(config: NaiveSchemaFormConfig) {
  return config
}
