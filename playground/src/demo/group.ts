import type { DefineGroupSchema } from '../../../src'
import { reactive, ref } from 'vue'
import { cityOptions } from './options'

export const groupModel = reactive({
  project: '',
  owner: '',
  city: null,
  role: null,
  startAt: null,
  budget: 20,
  enabled: true,
  color: '#2080f0',
  progress: 30,
  score: 2,
})

export const groupSchema = ref<DefineGroupSchema<typeof groupModel>[]>([
  {
    title: '基础配置',
    helpMessage: 'collapsedRows=1，只有超出折叠行数才显示按钮',
    collapsedRows: 1,
    form: [
      { field: 'project', label: '项目名', component: 'input', showRequireMark: true, gridItemProps: { span: 8 } },
      { field: 'owner', label: '负责人', component: 'input', gridItemProps: { span: 8 } },
      { field: 'city', label: '城市', component: 'select', options: cityOptions, gridItemProps: { span: 8 } },
      { field: 'startAt', label: '启动日期', component: 'datePicker', componentProps: { type: 'date' }, gridItemProps: { span: 8 } },
    ],
  },
  {
    title: '高级配置',
    helpMessage: '这里演示 hide 回调、禁用分组和自定义折叠按钮 slot',
    collapsedRows: 1,
    hide: ({ model }) => model.project === 'hide',
    form: [
      { field: 'budget', label: '预算', component: 'inputNumber', componentProps: { min: 0 }, gridItemProps: { span: 8 } },
      { field: 'enabled', label: '启用', component: 'switch', gridItemProps: { span: 8 } },
      { field: 'color', label: '颜色', component: 'colorPicker', gridItemProps: { span: 8 } },
      { field: 'progress', label: '进度', component: 'slider', gridItemProps: { span: 12 } },
      { field: 'score', label: '评分', component: 'rate', gridItemProps: { span: 12 } },
    ],
  },
])

