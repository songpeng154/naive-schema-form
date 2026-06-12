/* --------------弹框表单-------------- */

import type { CardProps, DrawerContentProps, DrawerProps, ModalProps } from 'naive-ui'
import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
} from '@/components/schema-form/types/common.ts'

import type { Recordable } from '@/types/shared.ts'

export type PopupType = 'drawer' | 'modal'

export interface PopupSchemaFormProps<TModel extends Recordable = Recordable> extends SchemaFormCommonProps<TModel> {
  /**
   * schema 配置
   */
  schema: DefineSchema<TModel>[]

  /**
   * 是否可见
   */
  visible?: boolean

  /**
   * 弹框类型：抽屉 | 模态框
   */
  type?: PopupType

  /**
   * 弹框标题
   */
  title?: string

  /**
   * 宽度
   */
  width?: string

  /**
   * 高度
   */
  height?: string

  /**
   * 抽屉属性
   */
  drawerProps?: DrawerProps

  /**
   * 抽屉内容属性
   */
  drawerContentProps?: DrawerContentProps

  /**
   * 模态框属性
   */
  modalProps?: ModalProps

  /**
   * 模态框卡片属性
   */
  modalCardProps?: CardProps

  /**
   * 点击遮罩层是否关闭模态框和抽屉
   */
  maskClosable?: boolean

  /**
   * 关闭模态框和抽屉时重置表单
   */
  resetOnClose?: boolean

  /**
   * 关闭模态框和抽屉时弹框确认是否关闭
   */
  confirmOnClose?: boolean

  /**
   * 确认弹框标题
   */
  confirmTitle?: string

  /**
   * 确认弹框内容
   */
  confirmContent?: string
}

export interface PopupSchemaFormExpose extends SchemaFormCommonExpose {
}

export interface PopupSchemaFormSlots extends SchemaFormCommonSlots {
  /**
   * 弹框头部
   */
  header: () => any

  /**
   * 表单前
   */
  formBefore: () => any

  /**
   * 表单后
   */
  formAfter: () => any

  /**
   * 弹框底部
   */
  footer: () => any
}
