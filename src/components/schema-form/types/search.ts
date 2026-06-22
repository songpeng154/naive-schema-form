/* --------------搜索表单-------------- */

import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
} from '@/components/schema-form/types/common.ts'

/**
 * 搜索表单组件的 Props 类型
 */
export interface SearchSchemaFormProps<TModel extends object = any> extends SchemaFormCommonProps<TModel> {
  /**
   * schema 配置
   */
  schema: DefineSchema<TModel>[]

  /**
   * 是否开启折叠（关闭后折叠按钮不再显示）
   */
  enableCollapsed?: boolean

  /**
   * 查询表单默认展示个数
   */
  searchShowNumber?: number

  /**
   * 是否折叠
   */
  collapsed?: boolean

  /**
   * 折叠文字（默认: 展开）
   */
  collapsedText?: string

  /**
   * 未折叠文字（默认: 收起）
   */
  expandedText?: string
}

/**
 * 搜索表单向外暴露的方法实例
 */
export interface SearchSchemaFormExpose extends SchemaFormCommonExpose {
  toggleCollapsed: (isCollapsed: boolean) => void
}

/**
 * 搜索表单支持的插槽定义
 */
export interface SearchSchemaFormSlots extends SchemaFormCommonSlots {

}
