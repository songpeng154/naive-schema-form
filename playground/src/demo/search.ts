import type { DefineSchema } from '../../../src'
import { reactive } from 'vue'
import { cityOptions, roleOptions } from './options'

export const searchModel = reactive({
  keyword: '',
  city: null,
  role: null,
  enabled: null,
  createdAt: null,
  owner: '',
})

// Prefer reactive schema arrays so exported demo types stay portable in declaration emit.
export const searchSchema = reactive<DefineSchema<typeof searchModel>[]>([
  { field: 'keyword', label: '关键词', component: 'input' },
  { field: 'city', label: '城市', component: 'select', options: cityOptions },
  { field: 'role', label: '角色', component: 'select', options: roleOptions },
  {
    field: 'enabled',
    label: '状态',
    component: 'select',
    options: [
      { label: '启用', value: true },
      { label: '停用', value: false },
    ],
  },
  { field: 'createdAt', label: '创建时间', component: 'datePicker', componentProps: { type: 'daterange' } },
  { field: 'owner', label: '负责人', component: 'input' },
])
