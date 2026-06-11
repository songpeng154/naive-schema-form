import type { DefineSchema } from '../src'
import { mount } from '@vue/test-utils'
import { expect, it } from 'vitest'
import { reactive, ref } from 'vue'
import {
  createNaiveSchemaForm,
  extendSchemaComponents,
  getSchemaComponentAdapter,
  Grid,
  schemaComponentRegistry,
  SchemaForm,
} from '../src'
import responsivePropsValue from '../src/grid/hooks/responsive-props-value'

it('exports default registry helpers', () => {
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

it('custom component names and props can be typed by module augmentation', () => {
  const schema = {
    field: 'code',
    label: 'Code',
    component: 'testInput',
    componentProps: {
      prefix: 'NSF',
    },
  } satisfies DefineSchema<{ code: string }>

  expect(schema.component).toBe('testInput')
})

it('schema hide controls form item visibility', () => {
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

it('schema-form keeps boolean defaults when optional props are not passed', () => {
  const model = reactive({ name: '' })
  const wrapper = mount(SchemaForm, {
    props: {
      model,
      schema: [
        {
          field: 'name',
          label: 'Name',
          component: 'input',
        },
      ] satisfies DefineSchema<typeof model>[],
    },
  })

  expect(wrapper.find('.n-form-item-label').text()).toContain('Name')
  expect(wrapper.text()).toContain('提交')
})

it('string labels expose the full text through native title attribute', () => {
  const model = reactive({ name: '' })
  const wrapper = mount(SchemaForm, {
    props: {
      model,
      schema: [
        {
          field: 'name',
          label: 'A very long field label',
          component: 'input',
        },
      ] satisfies DefineSchema<typeof model>[],
      showActions: false,
    },
  })

  expect(wrapper.find('span[title]').attributes('title')).toBe('A very long field label')
})

it('schema-only component props are not forwarded to form item', () => {
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

it('nested formItemProps remain available as an escape hatch', () => {
  const model = reactive({ city: null as string | null })
  const wrapper = mount(SchemaForm, {
    props: {
      model,
      schema: [
        {
          field: 'city',
          label: 'City',
          component: 'select',
          options: [{ label: 'Shenzhen', value: 'shenzhen' }],
          formItemProps: {
            showLabel: false,
            feedbackClass: 'custom-feedback',
          },
        },
      ] satisfies DefineSchema<typeof model>[],
      showActions: false,
    },
  })

  expect(wrapper.find('.n-form-item-label').exists()).toBe(false)
})

it('grid maps x/y gaps to css column/row gaps', () => {
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

it('global schema-form config provides defaults and instance props override nested config', () => {
  const model = reactive({ name: '' })
  const wrapper = mount(SchemaForm, {
    global: {
      plugins: [
        createNaiveSchemaForm({
          schemaForm: {
            common: {
              showReset: false,
            },
            base: {
              submitText: '保存',
              gridProps: {
                xGap: 18,
              },
            },
          },
        }),
      ],
    },
    props: {
      model,
      schema: [
        {
          field: 'name',
          label: 'Name',
          component: 'input',
        },
      ] satisfies DefineSchema<typeof model>[],
      gridProps: {
        yGap: 6,
      },
    },
  })

  expect((wrapper.vm as any).props.submitText).toBe('保存')
  expect((wrapper.vm as any).props.showReset).toBe(false)
  expect(wrapper.find('.grid').attributes('style')).toContain('row-gap: 6px')
  expect(wrapper.find('.grid').attributes('style')).toContain('column-gap: 18px')
})

it('instance props override global schema-form defaults', () => {
  const model = reactive({ name: '' })
  const wrapper = mount(SchemaForm, {
    global: {
      plugins: [
        createNaiveSchemaForm({
          schemaForm: {
            base: {
              submitText: '保存',
            },
          },
        }),
      ],
    },
    props: {
      model,
      schema: [
        {
          field: 'name',
          label: 'Name',
          component: 'input',
        },
      ] satisfies DefineSchema<typeof model>[],
      submitText: '立即提交',
    },
  })

  expect((wrapper.vm as any).props.submitText).toBe('立即提交')
})

it('global component props apply to schema components and local schema props win', () => {
  const model = reactive({ description: '', password: '' })

  const textareaWrapper = mount(SchemaForm, {
    global: {
      plugins: [
        createNaiveSchemaForm({
          schemaForm: {
            componentProps: {
              input: {
                type: 'textarea',
              },
            },
          },
        }),
      ],
    },
    props: {
      model,
      schema: [
        {
          field: 'description',
          label: 'Description',
          component: 'input',
        },
      ] satisfies DefineSchema<typeof model>[],
      showActions: false,
    },
  })

  expect(textareaWrapper.find('textarea').exists()).toBe(true)

  const inputWrapper = mount(SchemaForm, {
    global: {
      plugins: [
        createNaiveSchemaForm({
          schemaForm: {
            componentProps: {
              input: {
                type: 'textarea',
              },
            },
          },
        }),
      ],
    },
    props: {
      model,
      schema: [
        {
          field: 'password',
          label: 'Password',
          component: 'input',
          componentProps: {
            type: 'password',
          },
        },
      ] satisfies DefineSchema<typeof model>[],
      showActions: false,
    },
  })

  expect(inputWrapper.find('textarea').exists()).toBe(false)
  expect(inputWrapper.find('input[type="password"]').exists()).toBe(true)
})

it('responsive props respect custom breakpoints and preserve zero values', () => {
  const width = ref(400)
  const responsiveGap = responsivePropsValue(width, {
    xGap: {
      xs: 0,
      sm: 12,
    },
  }, 'xGap', {
    xs: 500,
    sm: 700,
    md: 900,
    lg: 1200,
    xl: 1600,
  })

  expect(responsiveGap.value).toBe(0)

  width.value = 640

  const responsiveSpan = responsivePropsValue(width, {
    span: {
      xs: 4,
      sm: 8,
    },
  }, 'span', {
    xs: 700,
    sm: 900,
    md: 1100,
    lg: 1300,
    xl: 1600,
  })

  expect(responsiveSpan.value).toBe(4)

  width.value = 760
  expect(responsiveSpan.value).toBe(8)
})
