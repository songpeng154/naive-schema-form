import type { FormInst } from 'naive-ui'
import type { Component, ComputedRef, ModelRef, Ref } from 'vue'
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'

export type ComponentActionType
  = | 'input'
    | 'select'
    | 'date'
    | 'time'
    | 'upload'
    | 'check'
    | 'default'

export interface SchemaComponentAdapter {
  component: Component
  actionType?: ComponentActionType
  modelProp?: string
  mapPlaceholder?: boolean
  mapOptions?: boolean
  dateTypes?: string[]
}
export type SchemaComponentRegistry = Record<string, SchemaComponentAdapter>

export interface SchemaFormCoreOptions<TProps extends SchemaFormCommonProps> {
  omitFormProps?: (keyof TProps)[]
  omitContentSlots?: string[]
}

export interface SchemaFormControllerResult {
  formRef: Ref<SchemaFormCommonExpose | undefined>
  commonExpose: SchemaFormCommonExpose
  formProps: ComputedRef<Recordable>
  formContentSlots: ComputedRef<Record<string, any>>
}

export type SchemaFormController = <TProps extends SchemaFormCommonProps>(
  props: TProps,
  model: ModelRef<Recordable>,
  slots: Record<string, any>,
  options?: SchemaFormCoreOptions<TProps>,
) => SchemaFormControllerResult

export interface SchemaFormExposeControllerOptions {
  props: SchemaFormCommonProps
  formRef: Ref<FormInst | undefined>
}
