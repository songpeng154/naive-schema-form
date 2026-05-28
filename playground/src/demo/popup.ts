import type { DefineSchema } from '../../../src'
import { reactive, ref } from 'vue'
import { cityOptions } from './options'

export const popupVisible = ref(false)
export const modalVisible = ref(false)

export const popupModel = reactive({
  title: '',
  city: null,
  owner: '',
  priority: 2,
  enabled: true,
  remark: '',
})

export const popupSchema = ref<DefineSchema<typeof popupModel>[]>([
  { field: 'title', label: '标题', component: 'input', showRequireMark: true, gridItemProps: { span: 12 } },
  { field: 'city', label: '城市', component: 'select', options: cityOptions, gridItemProps: { span: 12 } },
  { field: 'owner', label: '负责人', component: 'input', gridItemProps: { span: 12 } },
  { field: 'priority', label: '优先级', component: 'rate', gridItemProps: { span: 12 } },
  { field: 'enabled', label: '启用', component: 'switch', gridItemProps: { span: 12 } },
  {
    field: 'remark',
    label: '备注',
    component: 'input',
    componentProps: { type: 'textarea', rows: 3 },
    gridItemProps: 24,
  },
])

