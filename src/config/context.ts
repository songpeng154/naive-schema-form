import type { InjectionKey } from 'vue'
import type { NaiveSchemaFormConfig, ResolvedNaiveSchemaFormConfig } from '@/config/types'
import { inject, provide } from 'vue'
import { DEFAULT_NAIVE_SCHEMA_FORM_CONFIG } from '@/config/defaults'
import { resolveNaiveSchemaFormConfig } from '@/config/utils'

export const NAIVE_SCHEMA_FORM_CONFIG_KEY: InjectionKey<Readonly<ResolvedNaiveSchemaFormConfig>> = Symbol('naive-schema-form-config')

/**
 * Provide global grid and schema-form defaults from the current component tree.
 *
 * @param config App-level defaults merged on top of the library defaults.
 * @returns The resolved readonly config that was provided.
 */
export function provideNaiveSchemaFormConfig(config: NaiveSchemaFormConfig = {}) {
  const resolved = resolveNaiveSchemaFormConfig(config)
  provide(NAIVE_SCHEMA_FORM_CONFIG_KEY, resolved)
  return resolved
}

/**
 * Read the resolved global config from the current component tree.
 *
 * Falls back to the built-in library defaults when no provider or plugin is installed.
 */
export function useNaiveSchemaFormConfig() {
  return inject(NAIVE_SCHEMA_FORM_CONFIG_KEY, DEFAULT_NAIVE_SCHEMA_FORM_CONFIG)
}
