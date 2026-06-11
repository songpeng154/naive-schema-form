import { mount } from '@vue/test-utils'
import { NForm, NFormItem, NInput } from 'naive-ui'
import { it } from 'vitest'
import { h, reactive } from 'vue'

it('test raw naive-ui', () => {
  const model = reactive({ name: '' })
  const rules = {
    name: { required: true, message: '请输入姓名', trigger: 'blur' },
  }

  const wrapper = mount(NForm, {
    props: { model, rules },
    slots: {
      default: () => h(NFormItem, { path: 'name', label: '姓名' }, { default: () => h(NInput) }),
    },
  })

  console.log('Raw naive ui asterisk:', wrapper.html().includes('n-form-item-label__asterisk'))
})
