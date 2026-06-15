/* --------------分组表单-------------- */

import type { MaybeRef } from 'vue'
import type { GridItemProps, GridProps } from '@/components/grid/types'
import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
  UnwrapSchema,
} from '@/components/schema-form/types/common.ts'

/**
 * 回调参数
 */
export interface GroupCallbackParams<
  TForm extends object = any,
> {
  group: GroupCallbackSchema<TForm>

  model: TForm
}

/**
 * 组回调参数
 */
export type GroupCallbackParamsFunction<
  TForm extends object = any,
  R = never,
>
  = ((params: GroupCallbackParams<TForm>) => R)

export interface DefineGroupSchema<
  TForm extends object = any,
> {
  /**
   * 模块标题
   */
  title: MaybeRef<string>

  /**
   * 帮助提示信息
   */
  helpMessage?: MaybeRef<string>

  /**
   * 是否隐藏
   */
  hide?: MaybeRef<boolean> | GroupCallbackParamsFunction<TForm, boolean>

  /**
   * 表单
   */
  form: DefineSchema<TForm>[]

  /**
   * 是否折叠
   */
  collapsed?: boolean

  /**
   * 折叠时显示的行数
   */
  collapsedRows?: number

  /**
   * 是否隐藏折叠按钮
   */
  hideCollapseButton?: MaybeRef<boolean>

  /**
   * 禁用表单
   * TODO: 未完成
   */
  disabled?: MaybeRef<boolean>

  /**
   * grid item 组件属性
   */
  gridItemProps?: MaybeRef<number | GridItemProps>

  /**
   * grid 组件属性
   */
  gridProps?: MaybeRef<GridProps>
}

export interface UnwrapGroupSchema<
  TForm extends object = any,
> {
  title: string
  helpMessage?: string
  hide?: boolean | GroupCallbackParamsFunction<TForm, boolean>
  form: DefineSchema<TForm>[] | UnwrapSchema<TForm>[]
  collapsed?: boolean
  collapsedRows?: number
  hideCollapseButton?: boolean
  disabled?: boolean
  gridItemProps?: number | GridItemProps
  gridProps?: GridProps
}

export interface RuntimeGroupBaseSchema<
  TForm extends object = any,
> {
  key: string
  title: string
  helpMessage?: string
  form: DefineSchema<TForm>[] | UnwrapSchema<TForm>[]
  collapsed: boolean
  collapsedRows: number
  hideCollapseButton?: boolean
  disabled?: boolean
  gridItemProps?: number | GridItemProps
  gridProps?: GridProps
}

export interface GroupCallbackSchema<
  TForm extends object = any,
> {
  key?: string
  title: string
  helpMessage?: string
  form: DefineSchema<TForm>[] | UnwrapSchema<TForm>[]
  collapsed?: boolean
  collapsedRows?: number
  hideCollapseButton?: boolean
  disabled?: boolean
  gridItemProps?: number | GridItemProps
  gridProps?: GridProps
}

export interface RuntimeGroupSchema<
  TForm extends object = any,
> extends RuntimeGroupBaseSchema<TForm> {
  hide?: boolean | GroupCallbackParamsFunction<TForm, boolean>
}

export interface GroupSchemaFormProps<TModel extends object = any> extends SchemaFormCommonProps<TModel> {
  /**
   * schema 配置
   */
  schema: DefineGroupSchema<TModel>[]

  /**
   * 默认是否折叠
   */
  defaultCollapsed?: boolean

  /**
   * 默认不折叠的行数
   */
  defaultCollapsedRows?: number

  /**
   * 折叠文字（默认: 展开）
   */
  collapsedText?: string

  /**
   * 未折叠文字（默认: 收起）
   */
  expandedText?: string
}

export interface GroupSchemaFormExpose extends SchemaFormCommonExpose {
  toggleCollapsed: (index: number, isCollapsed?: boolean) => void
}

export interface GroupSchemaFormSlots extends SchemaFormCommonSlots {
  /**
   * 自定义 group 标题
   */
  groupTitle: (props: { config: RuntimeGroupSchema }) => any

  /**
   * 自定义折叠按钮
   */
  collapsedButton: (props: {
    config: RuntimeGroupSchema
    overflow: boolean
    toggleCollapsed: (config: RuntimeGroupSchema, isCollapsed?: boolean) => void
  }) => any
}
