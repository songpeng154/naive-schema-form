import type { InjectionKey } from 'vue'
import type { SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import type { NaiveSchemaFormConfig, SchemaFormGlobalConfig } from '@/types/global.ts'
import { reactiveComputed } from '@vueuse/core'
import { merge } from 'es-toolkit'
import { inject, provide } from 'vue'

/**
 * 全局配置的依赖注入 Key
 */
export const NAIVE_SCHEMA_FORM_CONFIG_KEY: InjectionKey<Readonly<NaiveSchemaFormConfig>> = Symbol('naive-schema-form-config')

/**
 * 在当前组件树中提供全局的栅格(grid)和模式表单(schema-form)默认配置。
 *
 * @param config 合并到库默认配置之上的应用级默认配置。
 */
export function provideNaiveSchemaFormConfig(config: NaiveSchemaFormConfig = {}) {
  provide(NAIVE_SCHEMA_FORM_CONFIG_KEY, config)
}

/**
 * 从当前组件树中读取已解析的全局配置。
 *
 * 当未提供配置或未安装插件时，将回退到库内置的默认配置。
 */
export function useNaiveSchemaFormConfig() {
  return inject(NAIVE_SCHEMA_FORM_CONFIG_KEY, {})
}

/**
 * 合并配置
 */
export function useMergeGlobalConfig<T extends SchemaFormCommonProps>(variant: keyof Omit<SchemaFormGlobalConfig, 'componentProps'>, props: T) {
  const config = useNaiveSchemaFormConfig()
  return reactiveComputed(() => config?.schemaForm?.[variant] ? merge(config?.schemaForm?.[variant] ?? {}, props) as T : props)
}
