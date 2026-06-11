import { mount } from '@vue/test-utils'
import { it } from 'vitest'
import { reactive } from 'vue'
import { SchemaForm } from '../src/index.ts'

it('test', () => {
  const model = reactive({ name: '', city: '' })
  const schema = [
    { field: 'name', label: '姓名', component: 'input' },
  ]
  const rules = {
    name: { required: true, message: '请输入姓名', trigger: 'blur' },
  }

  const wrapper = mount(SchemaForm, {
    props: { model, schema, rules },
  })

  console.log('Does asterisk exist for Name?', wrapper.html().includes('n-form-item-label__asterisk'))
})
