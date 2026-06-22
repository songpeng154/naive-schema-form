import type { FormInst } from 'naive-ui'
import type { Component, ComputedRef, ModelRef, Ref } from 'vue'
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'

/**
 * 标识组件的输入交互行为类型
 */
export type ComponentActionType
  = | 'input'
    | 'select'
    | 'date'
    | 'time'
    | 'upload'
    | 'check'
    | 'default'

/**
 * 注册到系统中的组件适配器信息
 */
export interface SchemaComponentAdapter {
  component: Component
  actionType?: ComponentActionType
  modelProp?: string
  mapPlaceholder?: boolean
  mapOptions?: boolean
  dateTypes?: string[]
}
/**
 * 组件注册表
 */
export type SchemaComponentRegistry = Record<string, SchemaComponentAdapter>

/**
 * 内部控制器的选项配置
 */
export interface SchemaFormCoreOptions<TProps extends SchemaFormCommonProps> {
  omitFormProps?: (keyof TProps)[]
  omitContentSlots?: string[]
}

/**
 * SchemaFormController 初始化的返回结果结构
 */
export interface SchemaFormControllerResult {
  formRef: Ref<SchemaFormCommonExpose | undefined>
  commonExpose: SchemaFormCommonExpose
  formProps: ComputedRef<Recordable>
  formContentSlots: ComputedRef<Record<string, any>>
}

/**
 * 内部控制器的函数签名
 */
export type SchemaFormController = <TProps extends SchemaFormCommonProps>(
  props: TProps,
  model: ModelRef<Recordable>,
  slots: Record<string, any>,
  options?: SchemaFormCoreOptions<TProps>,
) => SchemaFormControllerResult

/**
 * 暴露内部 API 给外部引用的参数
 */
export interface SchemaFormExposeControllerOptions {
  props: SchemaFormCommonProps
  formRef: Ref<FormInst | undefined>
}
