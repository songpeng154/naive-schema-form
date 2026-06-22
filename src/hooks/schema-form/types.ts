import type { Ref } from 'vue'
import type { SchemaFormProps } from '@/components/schema-form/types/base.ts'
import type { DefineSchema, SchemaFormCommonExpose } from '@/components/schema-form/types/common.ts'
import type { WrapWithMaybeRef } from '@/types/shared.ts'

/**
 * SchemaForm 的 register 绑定属性类型
 */
export type SchemaFormRegisterProps<TModel extends object = any> = Omit<SchemaFormProps<TModel>, 'model' | 'schema'> & {
  'model': TModel
  'schema': DefineSchema<TModel>[]
  'onUpdate:model': (val: TModel) => void
  'onUpdate:schema': (val: DefineSchema<TModel>[]) => void
  'register': (instance: SchemaFormCommonExpose) => void
}

/**
 * schemaForm 的配置项类型（排除 model 和 register）
 */
export type UseSchemaFormOptions<TModel extends object = any> = WrapWithMaybeRef<Omit<SchemaFormProps<TModel>, 'model' | 'register' | 'schema'>> & {
  schema?: DefineSchema<TModel>[]
}

/**
 * schemaForm Hook 的第二参数联合类型
 */
export type UseSchemaFormArgs<TModel extends object = any>
  = | DefineSchema<TModel>[]
    | UseSchemaFormOptions<TModel>

/**
 * schemaForm 的返回值类型
 */
export interface UseSchemaFormReturn<TModel extends object = any> {
  /**
   * 注册对象，通过 v-bind 绑定到 SchemaForm 组件
   * @example
   * ```html
   * <SchemaForm v-bind="register" />
   * ```
   */
  register: SchemaFormRegisterProps<TModel>

  /**
   * 响应式 model 数据
   */
  model: Ref<TModel>

  /**
   * 响应式 schema 数据
   */
  schema: Ref<DefineSchema<TModel>[]>

  /**
   * 表单验证
   */
  validate: SchemaFormCommonExpose['validate']

  /**
   * 重置表单字段
   */
  resetFields: SchemaFormCommonExpose['resetFields']

  /**
   * 清除验证状态
   */
  restoreValidation: SchemaFormCommonExpose['restoreValidation']

  /**
   * 滚动到指定字段
   */
  scrollToField: SchemaFormCommonExpose['scrollToField']
}
