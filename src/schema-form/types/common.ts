import type { FormInst, FormItemProps, FormItemRule, FormRules } from 'naive-ui'
import type { Theme } from 'naive-ui/es/_mixins'
import type { ExtractThemeOverrides } from 'naive-ui/es/_mixins/use-theme'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'
import type { Paths } from 'type-fest'
import type { MaybeRef, UnwrapRef, VNode } from 'vue'
import type { GridItemProps, GridProps } from '@/grid/types'
import type { Recordable, WrapWithMaybeRef } from '@/types/shared'
import type { SchemaComponentName, SchemaComponentNameRef, SchemaComponentProps } from '@/schema-form/types/component'

export interface SchemaItemData {
  // item 元素
  el: HTMLElement

  // 字段
  field: string

  // item 标签宽度
  labelWidth?: number
}

// 回调参数
export interface CallbackParams<
  TForm extends Recordable = Recordable,
  DComponentsName extends string = SchemaComponentName,
> {
  schema: UnwrapSchema<TForm, DComponentsName>

  value: any

  model: TForm

  field: keyof TForm
}

// 回调参数
export type CallbackParamsFunction<
  TForm extends Recordable = Recordable,
  DComponentsName extends string = SchemaComponentName,
  R = never,
>
  = ((params: CallbackParams<TForm, DComponentsName>) => R)

// 插槽内容
export type SlotsContent = string | VNode | VNode[]

// 组件插槽
export type ComponentSlots = {
  default?: () => SlotsContent
} & {
  [key: string]: (...arg: any) => SlotsContent
}

/**
 * 表单规则预设
 * @description mail 邮箱
 * @description phone 手机号
 * @description landline 固定电话
 * @description idCard 身份证号
 * @description url 网址
 */
export type RulePresets = 'mail' | 'phone' | 'landline' | 'idCard' | 'url'

export type RulePresetsType = Record<RulePresets, {
  // 必填信息
  requiredMessage: string

  // 错误信息
  incorrectMessage: string

  // 验证
  validator: (value: string) => boolean
}>

export type SafeComponentProps<T> = T extends Recordable ? T : never

export type FormItemPropsRefs = WrapWithMaybeRef<Omit<FormItemProps, 'label' | 'rule' | 'path' | 'required'>>

// 通用的选项类型
export type OptionType = Recordable

// 常用组件属性映射
export interface CommonComponentPropsMap<
  TForm extends Recordable = any,
  DComponentsName extends MaybeRef<string> = SchemaComponentNameRef,
> {
  // 占位符
  placeholder?: MaybeRef<string>

  // 日期范围组件 开始占位符
  startPlaceholder?: string

  // 日期范围组件 开始占位符
  endPlaceholder?: string

  // 选项
  options?: MaybeRef<OptionType[]>

  // TODO:未完成
  // 禁用
  disabled?: MaybeRef<boolean> | CallbackParamsFunction<TForm, UnwrapRef<DComponentsName>, boolean>
}

// Schema配置
export interface Schema<
  TForm extends Recordable = any,
  DComponentsName extends MaybeRef<string> = SchemaComponentNameRef,
> extends FormItemPropsRefs, CommonComponentPropsMap<TForm, DComponentsName> {
  // 字段
  field?: MaybeRef<Paths<TForm> | (string & {})>

  // label 标签的文本
  label?: MaybeRef<string> | SlotsContent | CallbackParamsFunction<TForm, UnwrapRef<DComponentsName>, SlotsContent>

  // 双向绑定名称
  modelProp?: MaybeRef<string>

  // 组件
  component?: DComponentsName

  // 组件属性
  componentProps?: WrapWithMaybeRef<SafeComponentProps<SchemaComponentProps<DComponentsName>>>

  // 组件内容
  componentSlots?: SlotsContent
    | ComponentSlots
    | ((callbackParams: CallbackParams<TForm, UnwrapRef<DComponentsName>>) => SlotsContent | ComponentSlots)

  // 自定义插槽
  itemSlot?: MaybeRef<string>

  // formItem 插槽
  formItemSlot?: MaybeRef<string>

  // grid item组件属性
  gridItemProps?: MaybeRef<number | GridItemProps>

  // 规则
  rules?: MaybeRef<RulePresets | FormItemRule | FormItemRule[]>

  // 该formItem是否隐藏
  hide?: MaybeRef<boolean> | CallbackParamsFunction<TForm, UnwrapRef<DComponentsName>, boolean>

  // 帮助提示信息
  tooltip?: MaybeRef<string>
}

// 定义JSON 格式配置
export type DefineSchema<
  TForm extends Recordable = any,
  DComponentsName extends MaybeRef<string> = SchemaComponentNameRef,
>
  = DComponentsName extends MaybeRef<string> ? Schema<TForm, DComponentsName> : never

// 解包 JSON 格式配置
export type UnwrapSchema<
  TForm extends Recordable = any,
  DComponentsName extends MaybeRef<string> = SchemaComponentNameRef,
>
  = UnwrapRef<DefineSchema<TForm, DComponentsName>>

/* --------------通用类型-------------- */

export type FormLabelPlacement = 'left' | 'top'
export type FormLabelAlign = 'left' | 'right'
export type FormSize = 'small' | 'medium' | 'large'
export type FormRequireMarkPlacement = 'left' | 'right' | 'right-hanging'

// 通用props
export interface SchemaFormCommonProps {
  // 表单类名
  formClass?: string

  // 表单样式
  formStyle?: Partial<CSSStyleDeclaration>

  // 模型
  model: Recordable

  // grid item组件属性
  gridItemProps?: number | GridItemProps

  // grid组件属性
  gridProps?: GridProps

  // Naive UI Form rules
  rules?: FormRules

  // Naive UI Form 是否禁用
  disabled?: boolean

  // Naive UI Form 尺寸
  size?: FormSize

  // Naive UI Form 是否行内
  inline?: boolean

  // Naive UI Form 标签宽度
  labelWidth?: number | string

  // Naive UI Form 标签位置
  labelPlacement?: FormLabelPlacement

  // Naive UI Form 标签对齐方式
  labelAlign?: FormLabelAlign

  // Naive UI Form 必填标记位置
  requireMarkPlacement?: FormRequireMarkPlacement

  // Naive UI Form 是否显示必填标记
  showRequireMark?: boolean

  // Naive UI Form 是否显示标签
  showLabel?: boolean

  // Naive UI Form 是否显示反馈
  showFeedback?: boolean

  // Naive UI Form 标签是否省略
  labelOverflowOmitted?: boolean

  // Naive UI Form 校验文案
  validateMessages?: Partial<FormValidateMessages>

  // Naive UI Form 主题
  theme?: Theme<any, any>

  // Naive UI Form 主题覆盖
  themeOverrides?: ExtractThemeOverrides<Theme<any, any>>

  // Naive UI Form 内置主题覆盖
  builtinThemeOverrides?: ExtractThemeOverrides<Theme<any, any>>

  // 是否隐藏操作按钮
  showActions?: boolean

  // 默认日期组件格式
  defaultDateFormat?: string

  // 默认时间组件格式
  defaultTimeFormat?: string

  // 默认日期组件值格式
  defaultDateValueFormat?: string

  // 默认时间组件值格式
  defaultTimeValueFormat?: string

  // 校验失败时自动滚动到对应的字段
  scrollToFirstError?: boolean

  // 自动placeholder (item的label的类型为string才会生效，优先级最低)
  autoPlaceholder?: boolean

  // TODO:优化，支持生成其他的类型
  // 自动规则校验 (当showRequireMark为真的时候，会根据label自动生成校验提示信息,label的类型为string才会生效，优先级最低)
  autoRequiredRule?: boolean

  // 自动标签宽度 (优先级最低)
  autoLabelWidth?: boolean

  // 提交Loading
  submitLoading?: boolean

  // 提交按钮文字
  submitText?: string

  // 重置Loading
  resetLoading?: boolean

  // 重置按钮文字
  resetText?: string

  // 是否显示重置按钮
  showReset?: boolean

  /**
   * @description 提交事件 (传入该事件后会覆盖 onFinish | onFinishFailed 事件)
   * @param validate 验证方法
   * @param model 模型
   */
  onSubmit?: (validate: SchemaFormCommonExpose['validate'], model: Recordable) => void

  /**
   * @description 提交表单且数据验证成功后回调事件
   * @param model 模型
   */
  onFinish?: (model: Recordable) => void

  // 提交表单且数据验证失败后回调事件
  /**
   * @description 提交表单且数据验证失败后回调事件
   * @param error 错误信息
   */
  onFinishFailed?: (error: any) => void

  // 重置方法
  /**
   * @description 重置表单
   * @param validate 验证方法
   * @param model 模型
   */
  onReset?: (validate: SchemaFormCommonExpose['resetFields'], model: Recordable) => void

  /**
   * @description 重置表单后执行
   * @param model 模型
   */
  onResetAfter?: (model: Recordable) => void
}

export interface SchemaFormCommonEmits {
  /**
   * @description 提交表单
   * @param validate 验证方法
   * @param model 模型
   */
  submit: [validate: SchemaFormCommonExpose['validate'], model: Recordable]
  /**
   * @description 提交表单且数据验证成功
   * @param model 模型
   */
  finish: [model: Recordable]

  /**
   * @description 提交表单且数据验证失败
   * @param error 错误信息
   */
  finishFailed: [error: any]

  /**
   * @description 重置表单
   * @param validate 验证方法
   * @param model 模型
   */
  reset: [validate: SchemaFormCommonExpose['resetFields'], model: Recordable]

  /**
   * @description 重置表单后执行
   * @param model 模型
   */
  resetAfter: [model: Recordable]
}

// 通用插槽
export interface SchemaFormCommonSlots {
  // 自定义操作按钮
  actions: () => any

  // 自定义按钮前面
  actionsBefore: () => any

  // 自定义按钮后面
  actionsAfter: () => any
}

// 通用方法
export interface SchemaFormCommonExpose extends FormInst {
  // 重置
  resetFields: () => void

  // 滚动到字段
  scrollToField: (field: string) => void
}
