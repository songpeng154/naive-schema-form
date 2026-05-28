import type { AutoCompleteProps, CascaderProps, CheckboxGroupProps, CheckboxProps, ColorPickerProps, DatePickerProps, DynamicInputProps, DynamicTagsProps, InputNumberProps, InputProps, MentionProps, RadioGroupProps, RadioProps, RateProps, SelectProps, SliderProps, SwitchProps, TimePickerProps, TransferProps, TreeSelectProps, UploadProps } from 'naive-ui'
import type { MaybeRef } from 'vue'
import type { Recordable } from '@/types/shared'

export interface SchemaBuiltinComponentPropsMap {
  input?: Partial<InputProps>
  select?: Partial<SelectProps>
  autoComplete?: Partial<AutoCompleteProps>
  cascader?: Partial<CascaderProps>
  colorPicker?: Partial<ColorPickerProps>
  checkbox?: Partial<CheckboxProps>
  checkboxGroup?: Partial<CheckboxGroupProps>
  datePicker?: Partial<DatePickerProps>
  dynamicInput?: Partial<DynamicInputProps>
  dynamicTags?: Partial<DynamicTagsProps>
  inputNumber?: Partial<InputNumberProps>
  mention?: Partial<MentionProps>
  radio?: Partial<RadioProps>
  radioGroup?: Partial<RadioGroupProps>
  rate?: Partial<RateProps>
  slider?: Partial<SliderProps>
  switch?: Partial<SwitchProps>
  timePicker?: Partial<TimePickerProps>
  transfer?: Partial<TransferProps>
  treeSelect?: Partial<TreeSelectProps>
  upload?: Partial<UploadProps>
}

export interface SchemaCustomComponentPropsMap {}

export type SchemaComponentPropsMap = SchemaBuiltinComponentPropsMap & SchemaCustomComponentPropsMap

export type ComponentsProps = SchemaComponentPropsMap

export type SchemaComponentName = Extract<keyof SchemaComponentPropsMap, string>

export type ComponentsName = SchemaComponentName

export type SchemaComponentNameRef = MaybeRef<SchemaComponentName>

export type ComponentsNameRef = SchemaComponentNameRef

export type SchemaComponentProps<TName extends MaybeRef<string>>
  = [TName] extends [MaybeRef<infer Name>]
    ? Name extends keyof SchemaComponentPropsMap
      ? NonNullable<SchemaComponentPropsMap[Name]>
      : Recordable
    : Recordable
