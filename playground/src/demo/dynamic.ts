import type { CallbackParams, DefineSchema } from '../../../src'
import { reactive, ref } from 'vue'
import { cityOptions, roleOptions } from './options'

export interface DynamicModel {
  mode: 'personal' | 'company'
  name: string
  company: string
  city: string | null
  role: string
  remark: string
  locked: boolean
  extra: string
}

export const dynamicModel = reactive<DynamicModel>({
  mode: 'personal',
  name: '',
  company: '',
  city: null,
  role: 'operator',
  remark: '',
  locked: false,
  extra: '',
})

export const showExtraField = ref(false)

// Prefer reactive schema arrays so exported demo types stay portable in declaration emit.
export const dynamicSchema = reactive<DefineSchema<DynamicModel>[]>([
  {
    field: 'mode',
    label: '模式',
    component: 'radioGroup',
    options: [
      { label: '个人', value: 'personal' },
      { label: '企业', value: 'company' },
    ],
    gridItemProps: { span: 8 },
  },
  {
    field: 'locked',
    label: '锁定',
    component: 'switch',
    tooltip: '开启后城市、角色、备注会被禁用',
    gridItemProps: { span: 8 },
  },
  {
    field: 'name',
    label: ({ model }: CallbackParams<DynamicModel>) => model.mode === 'company' ? '联系人' : '姓名',
    component: 'input',
    showRequireMark: true,
    gridItemProps: { span: 8 },
  },
  {
    field: 'company',
    label: '企业名称',
    component: 'input',
    hide: ({ model }: CallbackParams<DynamicModel>) => model.mode !== 'company',
    showRequireMark: true,
    gridItemProps: { span: 8 },
  },
  {
    field: 'city',
    label: '城市',
    component: 'select',
    options: cityOptions,
    disabled: ({ model }: CallbackParams<DynamicModel>) => model.locked,
    gridItemProps: { span: 8 },
  },
  {
    field: 'role',
    label: '角色',
    component: 'select',
    options: roleOptions,
    disabled: ({ model }: CallbackParams<DynamicModel>) => model.locked,
    gridItemProps: { span: 8 },
  },
  {
    field: 'remark',
    label: '备注',
    component: 'input',
    componentProps: { type: 'textarea', rows: 3 },
    disabled: ({ model }: CallbackParams<DynamicModel>) => model.locked,
    gridItemProps: { span: 12 },
  },
  {
    field: 'extra',
    label: '运行时字段',
    component: 'input',
    hide: () => !showExtraField.value,
    tooltip: '通过按钮控制 hide 回调显示/隐藏',
    gridItemProps: { span: 12 },
  },
  {
    label: '自定义整项插槽',
    itemSlot: 'customBlock',
    gridItemProps: { span: 12 },
  },
  {
    field: 'role',
    label: 'FormItem Slot',
    formItemSlot: 'roleSummary',
    gridItemProps: { span: 12 },
  },
])
