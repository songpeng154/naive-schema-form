import type { FormItemRule } from 'naive-ui'
import type { CallbackParams, DefineSchema } from '../../../src'
import { reactive } from 'vue'
import { cityOptions, departmentTree, roleOptions, tagOptions } from './options'
import './custom-component'

export type BaseModel = typeof baseModel

export const baseModel = reactive({
  name: '',
  email: '',
  phone: '',
  city: null,
  role: 'operator',
  tags: [] as string[],
  enabled: true,
  age: 28,
  dateRange: null,
  time: null,
  color: '#18a058',
  score: 3,
  progress: 42,
  department: null,
  customCode: '',
  runtimeOnly: 'reset 后会清理',
})

const customComponentSchema = {
  field: 'customCode',
  label: '注册组件',
  component: 'badgeInput',
  componentProps: { prefix: 'NSF' },
  gridItemProps: { span: 12 },
} as const

const unknownComponentSchema = {
  label: '错误组件',
  component: 'notExists',
  gridItemProps: { span: 12 },
} as const

// Prefer reactive schema arrays so exported demo types stay portable in declaration emit.
export const baseSchema = reactive<DefineSchema<BaseModel>[]>([
  {
    field: 'name',
    label: '姓名',
    component: 'input',
    componentProps: {
      placeholder: '1',
    },
    showRequireMark: true,
    tooltip: '必填；提交失败会滚动到这里',
    gridItemProps: { span: 8 },
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'input',
    rules: 'mail',
    gridItemProps: { span: 8 },
  },
  {
    field: 'phone',
    label: '手机号',
    component: 'input',
    rules: 'phone',
    gridItemProps: { span: 8 },
  },
  {
    field: 'city',
    label: '城市',
    component: 'select',
    options: cityOptions,
    showRequireMark: true,
    gridItemProps: { span: 8 },
  },
  {
    field: 'role',
    label: '角色',
    component: 'radioGroup',
    options: roleOptions,
    gridItemProps: { span: 8 },
  },
  {
    field: 'tags',
    label: '标签',
    component: 'checkboxGroup',
    options: tagOptions,
    gridItemProps: { span: 8 },
  },
  {
    field: 'dateRange',
    label: '日期范围',
    component: 'datePicker',
    componentProps: { type: 'daterange', clearable: true },
    startPlaceholder: '开始日期',
    endPlaceholder: '结束日期',
    gridItemProps: { span: 8 },
  },
  {
    field: 'time',
    label: '提醒时间',
    component: 'timePicker',
    gridItemProps: { span: 8 },
  },
  {
    field: 'age',
    label: '年龄',
    component: 'inputNumber',
    componentProps: { min: 1, max: 100 },
    gridItemProps: { span: 8 },
  },
  {
    field: 'enabled',
    label: '启用',
    component: 'switch',
    gridItemProps: { span: 8 },
  },
  {
    field: 'color',
    label: '主题色',
    component: 'colorPicker',
    gridItemProps: { span: 8 },
  },
  {
    field: 'score',
    label: '评分',
    component: 'rate',
    gridItemProps: { span: 8 },
  },
  {
    field: 'progress',
    label: '进度',
    component: 'slider',
    componentProps: { min: 0, max: 100 },
    gridItemProps: { span: 12 },
  },
  {
    field: 'department',
    label: '部门',
    component: 'treeSelect',
    options: departmentTree,
    componentProps: { keyField: 'key', clearable: true },
    gridItemProps: { span: 12 },
  },
  customComponentSchema as DefineSchema<BaseModel>,
  {
    label: '整项插槽',
    slot: 'wholeItem',
    gridItemProps: { span: 12 },
  },
  {
    field: 'role',
    label: '内容插槽',
    formItemSlot: 'rolePreview',
    gridItemProps: { span: 12 },
  },
  {
    field: 'city',
    label: ({ model }: CallbackParams<BaseModel>) => `动态 Label：${model.city || '未选城市'}`,
    component: 'select',
    options: cityOptions,
    hide: ({ model }: CallbackParams<BaseModel>) => model.role === 'guest',
    gridItemProps: { span: 12 },
  },
  unknownComponentSchema as unknown as DefineSchema<BaseModel>,
  {
    label: '错误日期类型',
    component: 'datePicker',
    componentProps: { type: 'month' },
    gridItemProps: { span: 12 },
  },
])

export const validationRules = {
  name: {
    required: true,
    message: '请输入姓名',
    trigger: 'blur',
  } satisfies FormItemRule,
  city: {
    required: true,
    message: '请选择城市',
    trigger: 'change',
  } satisfies FormItemRule,
}
