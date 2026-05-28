import type { DefineSchema, SchemaComponentName } from '../src'
import { mount } from '@vue/test-utils'
import { expect, test } from 'vitest'
import { reactive } from 'vue'
import {
  Grid,
  SchemaForm,
  schemaComponentRegistry,
  extendSchemaComponents,
  getSchemaComponentAdapter,
} from '../src'

test('exports default registry helpers', () => {
  expect(schemaComponentRegistry.input).toBeTruthy()
  expect(schemaComponentRegistry.select).toBeTruthy()
  expect(getSchemaComponentAdapter('input')).toBe(schemaComponentRegistry.input)
  extendSchemaComponents({
    custom: schemaComponentRegistry.input,
  })
  expect(getSchemaComponentAdapter('custom')).toBe(schemaComponentRegistry.input)
})

declare module '../src' {
  interface SchemaCustomComponentPropsMap {
    testInput: {
      prefix?: string
    }
  }
}

test('custom component names and props can be typed by module augmentation', () => {
  type Names = SchemaComponentName
  const name: Names = 'testInput'
  const schema: DefineSchema<{ code: string }, 'testInput'> = {
    field: 'code',
    label: 'Code',
    component: name,
    componentProps: {
      prefix: 'NSF',
    },
  }

  expect(schema.component).toBe('testInput')
})

test('schema hide controls form item visibility', () => {
  const model = reactive({ name: '' })
  const wrapper = mount(SchemaForm, {
    props: {
      model,
      schema: [
        {
          field: 'name',
          label: 'Name',
          component: 'input',
          hide: true,
        },
      ] satisfies DefineSchema<typeof model>[],
      showActions: false,
    },
  })

  expect(wrapper.find('.n-form-item').exists()).toBe(false)
})

test('schema-only component props are not forwarded to form item', () => {
  const model = reactive({ city: null as string | null })
  const wrapper = mount(SchemaForm, {
    props: {
      model,
      schema: [
        {
          field: 'city',
          label: 'City',
          component: 'select',
          placeholder: 'Please select',
          options: [{ label: 'Shenzhen', value: 'shenzhen' }],
          disabled: true,
        },
      ] satisfies DefineSchema<typeof model>[],
      showActions: false,
    },
  })

  const formItem = wrapper.findComponent({ name: 'FormItem' })
  expect(formItem.attributes('placeholder')).toBeUndefined()
  expect(formItem.attributes('options')).toBeUndefined()
  expect(formItem.attributes('disabled')).toBeUndefined()
})

test('grid maps x/y gaps to css column/row gaps', () => {
  const wrapper = mount(Grid, {
    props: {
      cols: 24,
      xGap: 16,
      yGap: 8,
    },
    slots: {
      default: '<div />',
    },
  })

  expect(wrapper.attributes('style')).toContain('row-gap: 8px')
  expect(wrapper.attributes('style')).toContain('column-gap: 16px')
})
