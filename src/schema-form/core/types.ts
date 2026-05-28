import type { FormInst, FormItemRule } from 'naive-ui'
import type { Component, ComputedRef, ModelRef, Ref } from 'vue'
import type { GridItemProps } from '@/grid/types'
import type {
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SlotsContent,
  UnwrapSchema,
} from '@/schema-form/types/common.ts'
import type { SchemaComponentName, SchemaComponentPropsMap } from '@/schema-form/types/component'
import type { Recordable } from '@/types/shared'

export type SchemaComponentValueType = 'input' | 'select' | 'date' | 'time' | 'checked' | 'default'

export interface SchemaComponentAdapter {
  component: Component
  valueType?: SchemaComponentValueType
  modelProp?: string
  mapPlaceholder?: boolean
  mapOptions?: boolean
  dateTypes?: string[]
}

export type SchemaComponentRegistry = Record<string, SchemaComponentAdapter>

export interface NormalizeSchemaContext<TForm extends Recordable = Recordable> {
  schemaFormProps: SchemaFormCommonProps
  schemaFormComponentProps?: Partial<SchemaComponentPropsMap>
  model: TForm
  fallbackGridItemProps?: number | GridItemProps
  disabled?: boolean
  formId: string
  index: number
}

export type NormalizeSchemaListContext<TForm extends Recordable = Recordable> = Omit<NormalizeSchemaContext<TForm>, 'index'>

export interface NormalizedSchema<TForm extends Recordable = Recordable> {
  raw: UnwrapSchema<TForm>
  model: TForm
  key: string
  field?: string
  label?: SlotsContent
  visible: boolean
  componentName?: SchemaComponentName | string
  component?: Component
  adapter?: SchemaComponentAdapter
  componentProps: Recordable
  formItemProps: Recordable
  gridItemProps: GridItemProps
  rules?: FormItemRule | FormItemRule[]
  itemSlot?: string
  formItemSlot?: string
  error?: string
}

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
