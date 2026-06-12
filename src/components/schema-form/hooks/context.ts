import type { ModelRef } from 'vue'
import type { SchemaFormCommonProps, SchemaItemData } from '@/components/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'
import { createInjectionState } from '@vueuse/core'
import { merge } from 'es-toolkit'
import { get, set } from 'es-toolkit/compat'
import { reactive } from 'vue'
import { useNaiveSchemaFormConfig } from '@/global.ts'

const [useProvideSchemaFormContext, useSchemaFormContext] = createInjectionState((schemaFormProps: SchemaFormCommonProps, model: ModelRef<Recordable>) => {
  const config = useNaiveSchemaFormConfig()
  const formItemData = reactive<Record<string, SchemaItemData>>({})
  /**
   * 获取 model 值
   */
  const getModelValue = (field: string) => get(model.value, field)

  /**
   * 设置 model 值
   */
  const setModelValue = (field: string, value: any) => set(model.value, field, value)

  const setFormItemData = (key: string, data: Partial<SchemaItemData>) => {
    formItemData[key] = merge(formItemData[key] || {}, data)
  }

  return {
    schemaFormProps,
    /**
     * 全局组件默认属性配置，用于跟局部 componentProps 合并
     */
    globalComponentProps: config?.schemaForm?.componentProps ?? {},
    model,
    getModelValue,
    setModelValue,
    formItemData,
    setFormItemData,
  }
})

export { useProvideSchemaFormContext, useSchemaFormContext }
