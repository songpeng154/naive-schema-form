import type { NaiveSchemaFormConfig, ResolvedNaiveSchemaFormConfig } from '@/config/types'
import type { Recordable } from '@/types/shared'
import { DEFAULT_NAIVE_SCHEMA_FORM_CONFIG } from '@/config/defaults'

function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (Object.prototype.toString.call(value) !== '[object Object]')
    return false
  const prototype = Object.getPrototypeOf(value)
  return prototype === null || prototype === Object.prototype
}

export function mergeConfig<T>(...sources: Array<Partial<T> | undefined>): T {
  const result: Recordable = {}

  for (const source of sources) {
    if (!source)
      continue

    for (const [key, value] of Object.entries(source)) {
      if (value === undefined)
        continue

      const currentValue = result[key]
      // Merge nested config objects so callers can override only the pieces they need.
      if (isPlainObject(currentValue) && isPlainObject(value)) {
        result[key] = mergeConfig(currentValue, value)
        continue
      }

      result[key] = Array.isArray(value) ? [...value] : value
    }
  }

  return result as T
}

export function resolveNaiveSchemaFormConfig(config: NaiveSchemaFormConfig = {}): Readonly<ResolvedNaiveSchemaFormConfig> {
  // Library defaults stay as the base layer; app-level config only overrides selected keys.
  return mergeConfig<ResolvedNaiveSchemaFormConfig>(
    DEFAULT_NAIVE_SCHEMA_FORM_CONFIG,
    config as Partial<ResolvedNaiveSchemaFormConfig>,
  )
}
