import type { DefineSchema } from '../../../src'
import { reactive } from 'vue'

export const autoLabelModel = reactive({
  short: '',
  mediumLength: '',
  veryLongLabel: '',
})

// Prefer reactive schema arrays so exported demo types stay portable in declaration emit.
export const autoLabelSchema = reactive<DefineSchema<typeof autoLabelModel>[]>([
  { field: 'short', label: '短', component: 'input' },
  { field: 'mediumLength', label: '中等长度标签', component: 'input' },
  { field: 'veryLongLabel', label: '非常非常长的标签文本', component: 'input' },
])
