import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import type { Theme } from 'naive-ui/es/_mixins'
import type { ExtractThemeOverrides } from 'naive-ui/es/_mixins/use-theme'
import type { FormValidateMessages } from 'naive-ui/es/form/src/interface'
import type { Paths } from 'type-fest'
import type { MaybeRef, UnwrapRef, VNode } from 'vue'
import type { GridItemProps, GridProps } from '@/grid/types'
import type {
  SchemaComponentName,
  SchemaComponentPropsMap,
} from '@/schema-form/types/component'
import type { Recordable, WrapWithMaybeRef } from '@/types/shared'

export interface SchemaItemData {
  /**
   * item 元素
   */
  el: HTMLElement

  /**
   * 字段
   */
  field: string

  /**
   * item 标签宽度
   */
  labelWidth?: number
}

/**
 * 回调参数
 */
export interface CallbackParams<
  TForm extends Recordable = Recordable,
> {
  value: any

  model: TForm

  field: keyof TForm
}

/**
 * 回调参数函数
 */
export type CallbackParamsFunction<
  TForm extends Recordable = Recordable,
  R = never,
>
  = ((params: CallbackParams<TForm>) => R)

/**
 * 插槽内容
 */
export type SlotsContent = string | VNode | VNode[]

/**
 * 组件插槽
 */
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
  /**
   * 必填信息
   */
  requiredMessage: string

  /**
   * 错误信息
   */
  incorrectMessage: string

  /**
   * 验证函数
   */
  validator: (value: string) => boolean
}>

export type SafeComponentProps<T> = T extends Recordable ? T : never

/**
 * 通用的选项类型
 */
export type OptionType = Recordable

/**
 * 公共的 Schema 级别 form-item 属性。
 * 保持导出列表精简，使 Schema 类型保持可移植性。
 * 不常用的底层属性请使用 formItemProps。
 */
export interface SchemaFormItemPublicProps {
  first?: MaybeRef<boolean>
  rulePath?: MaybeRef<string>
  showRequireMark?: MaybeRef<boolean>
  requireMarkPlacement?: MaybeRef<FormRequireMarkPlacement>
  showFeedback?: MaybeRef<boolean>
  size?: MaybeRef<FormSize>
  ignorePathChange?: MaybeRef<boolean>
  validationStatus?: MaybeRef<'error' | 'warning' | 'success'>
  feedback?: MaybeRef<string>
  feedbackClass?: MaybeRef<string>
  showLabel?: MaybeRef<boolean>
  labelWidth?: MaybeRef<string | number>
  labelAlign?: MaybeRef<FormLabelAlign>
  labelPlacement?: MaybeRef<FormLabelPlacement>
  contentClass?: MaybeRef<string>
  /**
   * 不常用底层 form-item 属性的扩展入口。
   * 保持运行时兼容性，无需将完整的 NFormItem 类型图谱引入 Schema。
   */
  formItemProps?: WrapWithMaybeRef<Recordable>
}

export type CallbackSchemaBase<
  TForm extends Recordable = any,
> = Omit<
  Schema<TForm>,
  'label' | 'hide' | 'disabled' | 'componentSlots' | 'componentProps'
> & {

}

/**
 * 常用组件属性映射
 */
export interface CommonComponentPropsMap<
  TForm extends Recordable = any,
> {
  /**
   * 占位符
   */
  placeholder?: MaybeRef<string>

  /**
   * 日期范围组件 开始占位符
   */
  startPlaceholder?: string

  /**
   * 日期范围组件 结束占位符
   */
  endPlaceholder?: string

  /**
   * 选项
   */
  options?: MaybeRef<OptionType[]>

  /**
   * 禁用
   * TODO: 未完成
   */
  disabled?: MaybeRef<boolean> | CallbackParamsFunction<TForm, boolean>
}

/**
 * Schema 基础配置
 */
export interface SchemaBaseConfig<TForm extends Recordable = any> extends SchemaFormItemPublicProps, CommonComponentPropsMap<TForm> {
  /**
   * 字段
   */
  field?: MaybeRef<Paths<TForm> | (string & {})>

  /**
   * label 标签的文本
   */
  label?: MaybeRef<string> | SlotsContent | CallbackParamsFunction<TForm, SlotsContent>

  /**
   * 双向绑定名称
   */
  modelProp?: MaybeRef<string>

  /**
   * 组件内容
   */
  componentSlots?: SlotsContent
    | ComponentSlots
    | ((callbackParams: CallbackParams<TForm>) => SlotsContent | ComponentSlots)

  /**
   * 自定义插槽
   */
  slot?: MaybeRef<string>

  /**
   * formItem 插槽
   */
  formItemSlot?: MaybeRef<string>

  /**
   * grid item 组件属性
   */
  gridItemProps?: MaybeRef<number | GridItemProps>

  /**
   * 规则
   */
  rules?: MaybeRef<RulePresets | FormItemRule | FormItemRule[]>

  /**
   * 该 formItem 是否隐藏
   */
  hide?: MaybeRef<boolean> | CallbackParamsFunction<TForm, boolean>

  /**
   * 帮助提示信息
   */
  tooltip?: MaybeRef<string>
}

/**
 *
 */
export interface SchemaComponent<
  DComponentsName extends SchemaComponentName = SchemaComponentName,
> {
  /**
   * 组件
   */
  component?: DComponentsName

  /**
   * 组件属性
   */
  componentProps?: WrapWithMaybeRef<SchemaComponentPropsMap[DComponentsName]>
}

/**
 * schema 联动组件类型
 */
export type SchemaComponentLinkedType = {
  [K in keyof SchemaComponentPropsMap]: SchemaComponent<K>
}[keyof SchemaComponentPropsMap]

/**
 * schema 配置
 */
export type Schema<
  TForm extends Recordable = any,
> = SchemaComponentLinkedType & SchemaBaseConfig<TForm>

/**
 * 定义 Schema 项。
 */
export type DefineSchema<
  TForm extends Recordable = any,
>
  = Schema<TForm>
/**
 * 解包 JSON 格式配置
 */
export type UnwrapSchema<
  TForm extends Recordable = any,
>
  = UnwrapRef<DefineSchema<TForm>>

/* --------------通用类型-------------- */

export type FormLabelPlacement = 'left' | 'top'
export type FormLabelAlign = 'left' | 'right'
export type FormSize = 'small' | 'medium' | 'large'
export type FormRequireMarkPlacement = 'left' | 'right' | 'right-hanging'

/**
 * 通用 props
 */
export interface SchemaFormCommonProps {
  /**
   * 表单类名
   */
  formClass?: string

  /**
   * 表单样式
   */
  formStyle?: Partial<CSSStyleDeclaration>

  /**
   * 模型
   */
  model: Recordable

  /**
   * grid item 组件属性
   */
  gridItemProps?: number | GridItemProps

  /**
   * grid 组件属性
   */
  gridProps?: GridProps

  /**
   * Naive UI Form rules
   */
  rules?: FormRules

  /**
   * Naive UI Form 是否禁用
   */
  disabled?: boolean

  /**
   * Naive UI Form 尺寸
   */
  size?: FormSize

  /**
   * Naive UI Form 是否行内
   */
  inline?: boolean

  /**
   * Naive UI Form 标签宽度
   */
  labelWidth?: number | string

  /**
   * Naive UI Form 标签位置
   */
  labelPlacement?: FormLabelPlacement

  /**
   * Naive UI Form 标签对齐方式
   */
  labelAlign?: FormLabelAlign

  /**
   * Naive UI Form 必填标记位置
   */
  requireMarkPlacement?: FormRequireMarkPlacement

  /**
   * Naive UI Form 是否显示必填标记
   */
  showRequireMark?: boolean

  /**
   * Naive UI Form 是否显示标签
   */
  showLabel?: boolean

  /**
   * Naive UI Form 是否显示反馈
   */
  showFeedback?: boolean

  /**
   * Naive UI Form 标签是否省略
   */
  labelOverflowOmitted?: boolean

  /**
   * Naive UI Form 校验文案
   */
  validateMessages?: Partial<FormValidateMessages>

  /**
   * Naive UI Form 主题
   */
  theme?: Theme<any, any>

  /**
   * Naive UI Form 主题覆盖
   */
  themeOverrides?: ExtractThemeOverrides<Theme<any, any>>

  /**
   * Naive UI Form 内置主题覆盖
   */
  builtinThemeOverrides?: ExtractThemeOverrides<Theme<any, any>>

  /**
   * 是否隐藏操作按钮
   */
  showActions?: boolean

  /**
   * 默认日期组件格式
   */
  defaultDateFormat?: string

  /**
   * 默认时间组件格式
   */
  defaultTimeFormat?: string

  /**
   * 默认日期组件值格式
   */
  defaultDateValueFormat?: string

  /**
   * 默认时间组件值格式
   */
  defaultTimeValueFormat?: string

  /**
   * 校验失败时自动滚动到对应的字段
   */
  scrollToFirstError?: boolean

  /**
   * 自动 placeholder（item 的 label 类型为 string 才会生效，优先级最低）
   */
  autoPlaceholder?: boolean

  /**
   * 自动规则校验（当 showRequireMark 为真时，会根据 label 自动生成校验提示信息，label 类型为 string 才会生效，优先级最低）
   * TODO: 优化，支持生成其他类型
   */
  autoRequiredRule?: boolean

  /**
   * 自动标签宽度（优先级最低）
   */
  autoLabelWidth?: boolean

  /**
   * 提交 Loading
   */
  submitLoading?: boolean

  /**
   * 提交按钮文字
   */
  submitText?: string

  /**
   * 重置 Loading
   */
  resetLoading?: boolean

  /**
   * 重置按钮文字
   */
  resetText?: string

  /**
   * 是否显示重置按钮
   */
  showReset?: boolean

  /**
   * 提交事件（传入该事件后会覆盖 onFinish | onFinishFailed 事件）
   * @param validate 验证方法
   * @param model 模型
   */
  onSubmit?: (validate: SchemaFormCommonExpose['validate'], model: Recordable) => void

  /**
   * 提交表单且数据验证成功后回调事件
   * @param model 模型
   */
  onFinish?: (model: Recordable) => void

  /**
   * 提交表单且数据验证失败后回调事件
   * @param error 错误信息
   */
  onFinishFailed?: (error: any) => void

  /**
   * 重置表单
   * @param validate 验证方法
   * @param model 模型
   */
  onReset?: (validate: SchemaFormCommonExpose['resetFields'], model: Recordable) => void

  /**
   * 重置表单后执行
   * @param model 模型
   */
  onResetAfter?: (model: Recordable) => void
}

export interface SchemaFormCommonEmits {
  /**
   * 提交表单
   * @param validate 验证方法
   * @param model 模型
   */
  submit: [validate: SchemaFormCommonExpose['validate'], model: Recordable]

  /**
   * 提交表单且数据验证成功
   * @param model 模型
   */
  finish: [model: Recordable]

  /**
   * 提交表单且数据验证失败
   * @param error 错误信息
   */
  finishFailed: [error: any]

  /**
   * 重置表单
   * @param validate 验证方法
   * @param model 模型
   */
  reset: [validate: SchemaFormCommonExpose['resetFields'], model: Recordable]

  /**
   * 重置表单后执行
   * @param model 模型
   */
  resetAfter: [model: Recordable]
}

/**
 * 通用插槽
 */
export interface SchemaFormCommonSlots {
  /**
   * 自定义操作按钮
   */
  actions: () => any

  /**
   * 自定义按钮前面
   */
  actionsBefore: () => any

  /**
   * 自定义按钮后面
   */
  actionsAfter: () => any
}

/**
 * 通用方法
 */
export interface SchemaFormCommonExpose extends FormInst {
  /**
   * 重置
   */
  resetFields: () => void

  /**
   * 滚动到字段
   */
  scrollToField: (field: string) => void
}
