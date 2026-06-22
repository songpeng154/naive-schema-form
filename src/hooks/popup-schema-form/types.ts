import type { Ref } from 'vue'
import type { DefineSchema } from '@/components/schema-form/types/common'
import type { PopupSchemaFormExpose, PopupSchemaFormProps } from '@/components/schema-form/types/popup'
import type { WrapWithMaybeRef } from '@/types/shared.ts'

/**
 * PopupSchemaForm 的 register 绑定属性类型
 */
export type PopupSchemaFormRegisterProps<TModel extends object = any> = Omit<PopupSchemaFormProps<TModel>, 'model' | 'schema' | 'visible'> & {
  'model': TModel
  'schema': DefineSchema<TModel>[]
  'visible': boolean
  'onUpdate:model': (val: TModel) => void
  'onUpdate:schema': (val: DefineSchema<TModel>[]) => void
  'onUpdate:visible': (val: boolean) => void
  'register': (instance: PopupSchemaFormExpose) => void
}

/**
 * usePopupSchemaForm 的配置项类型（排除 model、register 和 visible，可见性由 Hook 内部接管）
 */
export type UsePopupSchemaFormOptions<TModel extends object = any> = WrapWithMaybeRef<Omit<PopupSchemaFormProps<TModel>, 'model' | 'register' | 'schema' | 'visible'>> & {
  schema?: DefineSchema<TModel>[]
}

/**
 * usePopupSchemaForm Hook 的第二参数联合类型
 */
export type UsePopupSchemaFormArgs<TModel extends object = any>
  = | DefineSchema<TModel>[]
    | UsePopupSchemaFormOptions<TModel>

/**
 * usePopupSchemaForm 的返回值类型
 */
export interface UsePopupSchemaFormReturn<TModel extends object = any> {
  /**
   * 注册对象，通过 v-bind 绑定到 PopupSchemaForm 组件
   */
  register: PopupSchemaFormRegisterProps<TModel>

  /**
   * 响应式 model 数据
   */
  model: Ref<TModel>

  /**
   * 响应式 schema 数据
   */
  schema: Ref<DefineSchema<TModel>[]>

  /**
   * 弹窗可见性状态
   */
  visible: Ref<boolean>

  /**
   * 打开弹窗
   */
  open: () => void

  /**
   * 关闭弹窗
   */
  close: () => void

  /**
   * 切换弹窗
   */
  toggle: (_visible?: boolean) => void

  /**
   * 表单验证
   */
  validate: PopupSchemaFormExpose['validate']

  /**
   * 重置表单字段
   */
  resetFields: PopupSchemaFormExpose['resetFields']

  /**
   * 清除验证状态
   */
  restoreValidation: PopupSchemaFormExpose['restoreValidation']

  /**
   * 滚动到指定字段
   */
  scrollToField: PopupSchemaFormExpose['scrollToField']
}
