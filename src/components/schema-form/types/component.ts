import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, CheckboxProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, InputNumberProps, InputProps, MentionProps, RadioGroupProps, RadioProps, RateProps, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'

/**
 * SchemaForm 内置组件的 Props 映射表
 */
export interface SchemaBuiltinComponentPropsMap {
  'input'?: Partial<InputProps>
  'select'?: Partial<SelectProps>
  'auto-complete'?: Partial<AutoCompleteProps>
  'cascader'?: Partial<CascaderProps>
  'color-picker'?: Partial<ColorPickerProps>
  'checkbox'?: Partial<CheckboxProps>
  'checkbox-group'?: Partial<CheckboxGroupProps>
  'date-picker'?: Partial<DatePickerProps>
  'dynamic-input'?: Partial<DynamicInputProps>
  'dynamic-tags'?: Partial<DynamicTagsProps>
  'input-number'?: Partial<InputNumberProps>
  'mention'?: Partial<MentionProps>
  'radio'?: Partial<RadioProps>
  'radio-group'?: Partial<RadioGroupProps>
  'rate'?: Partial<RateProps>
  'slider'?: Partial<SliderProps>
  'switch'?: Partial<SwitchProps>
  'time-picker'?: Partial<TimePickerProps>
  'transfer'?: Partial<TransferProps>
  'tree-select'?: Partial<TreeSelectProps>
  'upload'?: Partial<UploadProps>
}

/**
 * SchemaForm 自定义组件的 Props 映射表，允许用户通过 TypeScript 模块补充扩展
 */
export interface SchemaCustomComponentPropsMap {}

/**
 * 合并后的组件 Props 映射表（内置组件 + 自定义组件）
 */
export type SchemaComponentPropsMap = SchemaBuiltinComponentPropsMap & SchemaCustomComponentPropsMap

/**
 * 所有合法的组件名称类型
 */
export type SchemaComponentName = Extract<keyof SchemaComponentPropsMap, string>
