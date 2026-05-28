import type { DefineSchema } from '../../../src'
import { reactive, ref } from 'vue'

export const autoLabelModel = reactive({
  short: '',
  mediumLength: '',
  veryLongLabel: '',
})

export const autoLabelSchema = ref<DefineSchema<typeof autoLabelModel>[]>([
  { field: 'short', label: '短', component: 'input' },
  { field: 'mediumLength', label: '中等长度标签', component: 'input' },
  { field: 'veryLongLabel', label: '非常非常长的标签文本', component: 'input' },
])
