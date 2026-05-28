import { NInput } from 'naive-ui'
import { defineComponent, h } from 'vue'
import { registerSchemaComponent } from '../../../src'

declare module '../../../src' {
  interface SchemaCustomComponentPropsMap {
    badgeInput: {
      prefix?: string
    }
  }
}

const CustomBadgeInput = defineComponent({
  name: 'CustomBadgeInput',
  props: {
    value: String,
    prefix: {
      type: String,
      default: 'ID',
    },
  },
  emits: ['update:value'],
  setup(props, { emit }) {
    return () => h('div', { class: 'custom-badge-input' }, [
      h('span', props.prefix),
      h(NInput, {
        value: props.value,
        placeholder: '自定义注册组件',
        onUpdateValue: value => emit('update:value', value),
      }),
    ])
  },
})

registerSchemaComponent('badgeInput', {
  component: CustomBadgeInput,
  valueType: 'input',
  mapPlaceholder: true,
})
