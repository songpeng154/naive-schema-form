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
      /**
       * 递归合并嵌套对象，使调用方可以只覆盖部分字段。
       */
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
  /**
   * 库默认值作为基础层，应用级配置仅覆盖选中的字段。
   */
  return mergeConfig<ResolvedNaiveSchemaFormConfig>(
    DEFAULT_NAIVE_SCHEMA_FORM_CONFIG,
    config as Partial<ResolvedNaiveSchemaFormConfig>,
  )
}
