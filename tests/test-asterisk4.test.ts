import { mount } from '@vue/test-utils'
import { NForm } from 'naive-ui'
import { it } from 'vitest'
import { reactive } from 'vue'
import { SchemaForm } from '../src/index.ts'

it('test nform rules', () => {
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

  console.log('NForm props rules:', wrapper.findComponent(NForm).props('rules'))
})
