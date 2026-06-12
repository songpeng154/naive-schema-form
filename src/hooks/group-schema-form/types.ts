import type { Ref } from 'vue'
import type { DefineGroupSchema, GroupSchemaFormExpose, GroupSchemaFormProps } from '@/components/schema-form/types/group'
import type { Recordable, WrapWithMaybeRef } from '@/types/shared.ts'

export type GroupSchemaFormRegisterProps<TModel extends Recordable> = Omit<GroupSchemaFormProps, 'model' | 'schema'> & {
  'model': TModel
  'schema': DefineGroupSchema<TModel>[]
  'onUpdate:model': (val: TModel) => void
  'onUpdate:schema': (val: DefineGroupSchema<TModel>[]) => void
  'register': (instance: GroupSchemaFormExpose) => void
}

/**
 * useGroupSchemaForm 的配置项类型（排除 model 和 register）
 */
export type UseGroupSchemaFormOptions<TModel extends Recordable> = WrapWithMaybeRef<Omit<GroupSchemaFormProps, 'model' | 'register' | 'schema'>> & {
  schema?: DefineGroupSchema<TModel>[]
}

/**
 * useGroupSchemaForm Hook 的第二参数联合类型
 */
export type UseGroupSchemaFormArgs<TModel extends Recordable>
  = | DefineGroupSchema<TModel>[]
    | UseGroupSchemaFormOptions<TModel>

/**
 * useGroupSchemaForm 的返回值类型
 */
export interface UseGroupSchemaFormReturn<TModel extends Recordable> {
  /**
   * 注册对象，通过 v-bind 绑定到 GroupSchemaForm 组件
   */
  register: GroupSchemaFormRegisterProps<TModel>

  /**
   * 响应式 model 数据
   */
  model: Ref<TModel>

  /**
   * 响应式 schema 数据
   */
  schema: Ref<DefineGroupSchema<TModel>[]>

  /**
   * 表单验证
   */
  validate: GroupSchemaFormExpose['validate']

  /**
   * 重置表单字段
   */
  resetFields: GroupSchemaFormExpose['resetFields']

  /**
   * 清除验证状态
   */
  restoreValidation: GroupSchemaFormExpose['restoreValidation']

  /**
   * 滚动到指定字段
   */
  scrollToField: GroupSchemaFormExpose['scrollToField']

  /**
   * 切换折叠状态
   */
  toggleCollapsed: GroupSchemaFormExpose['toggleCollapsed']
}
