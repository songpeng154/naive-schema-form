import type { Ref } from 'vue'
import type { DefineSchema } from '@/components/schema-form/types/common'
import type { SearchSchemaFormExpose, SearchSchemaFormProps } from '@/components/schema-form/types/search'
import type { Recordable, WrapWithMaybeRef } from '@/types/shared'

/**
 * useSearchSchemaForm 的配置项类型（排除 model 和 register）
 */
export type UseSearchSchemaFormOptions<TModel extends Recordable> = WrapWithMaybeRef<Omit<SearchSchemaFormProps<TModel>, 'model' | 'register' | 'schema'>> & {
  schema?: DefineSchema<TModel>[]
}

/**
 * useSearchSchemaForm Hook 的第二参数联合类型
 */
export type UseSearchSchemaFormArgs<TModel extends Recordable>
  = | DefineSchema<TModel>[]
    | UseSearchSchemaFormOptions<TModel>

/**
 * useSearchSchemaForm 的返回值类型
 */
export interface UseSearchSchemaFormReturn<TModel extends Recordable> {
  /**
   * 注册对象，通过 v-bind 绑定到 SearchSchemaForm 组件
   */
  register: Omit<UseSearchSchemaFormOptions<TModel>, 'schema'> & {
    'model': TModel
    'onUpdate:model': (val: TModel) => void
    'schema': DefineSchema<TModel>[]
    'onUpdate:schema': (val: DefineSchema<TModel>[]) => void
    'register': (instance: SearchSchemaFormExpose) => void
  }

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
  validate: SearchSchemaFormExpose['validate']

  /**
   * 重置表单字段
   */
  resetFields: SearchSchemaFormExpose['resetFields']

  /**
   * 清除验证状态
   */
  restoreValidation: SearchSchemaFormExpose['restoreValidation']

  /**
   * 滚动到指定字段
   */
  scrollToField: SearchSchemaFormExpose['scrollToField']

  /**
   * 切换折叠状态
   */
  toggleCollapsed: SearchSchemaFormExpose['toggleCollapsed']
}
