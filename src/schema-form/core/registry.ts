import type { Component } from 'vue'
import type { SchemaComponentAdapter, SchemaComponentRegistry } from '@/schema-form/core/types'
import type { SchemaComponentName } from '@/schema-form/types/component'
import {
  NAutoComplete,
  NCheckbox,
  NCheckboxGroup,
  NDatePicker,
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSelect,
  NSwitch,
  NTimePicker,
} from 'naive-ui'
import { defineAsyncComponent } from 'vue'

function lazy(loader: () => Promise<Component>) {
  return defineAsyncComponent({
    loader,
    delay: 200,
    timeout: 3000,
  })
}

export const schemaComponentRegistry: SchemaComponentRegistry = {
  input: {
    component: NInput,
    valueType: 'input',
    mapPlaceholder: true,
  },
  select: {
    component: NSelect,
    valueType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  autoComplete: {
    component: NAutoComplete,
    valueType: 'input',
    mapPlaceholder: true,
    mapOptions: true,
  },
  checkbox: {
    component: NCheckbox,
    valueType: 'checked',
    modelProp: 'checked',
  },
  checkboxGroup: {
    component: NCheckboxGroup,
  },
  datePicker: {
    component: NDatePicker,
    valueType: 'date',
    mapPlaceholder: true,
    dateTypes: ['date', 'datetime', 'daterange', 'datetimerange'],
  },
  inputNumber: {
    component: NInputNumber,
    valueType: 'input',
    mapPlaceholder: true,
  },
  radio: {
    component: NRadio,
    valueType: 'checked',
    modelProp: 'checked',
  },
  radioGroup: {
    component: NRadioGroup,
  },
  switch: {
    component: NSwitch,
  },
  timePicker: {
    component: NTimePicker,
    valueType: 'time',
    mapPlaceholder: true,
  },
  cascader: {
    component: lazy(() => import('naive-ui/es/cascader').then(m => m.NCascader)),
    valueType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  colorPicker: {
    component: lazy(() => import('naive-ui/es/color-picker').then(m => m.NColorPicker)),
    valueType: 'select',
  },
  dynamicInput: {
    component: lazy(() => import('naive-ui/es/dynamic-input').then(m => m.NDynamicInput)),
    mapPlaceholder: true,
  },
  dynamicTags: {
    component: lazy(() => import('naive-ui/es/dynamic-tags').then(m => m.NDynamicTags)),
  },
  mention: {
    component: lazy(() => import('naive-ui/es/mention').then(m => m.NMention)),
    valueType: 'input',
    mapPlaceholder: true,
    mapOptions: true,
  },
  rate: {
    component: lazy(() => import('naive-ui/es/rate').then(m => m.NRate)),
  },
  slider: {
    component: lazy(() => import('naive-ui/es/slider').then(m => m.NSlider)),
  },
  transfer: {
    component: lazy(() => import('naive-ui/es/transfer').then(m => m.NTransfer)),
    mapOptions: true,
  },
  treeSelect: {
    component: lazy(() => import('naive-ui/es/tree-select').then(m => m.NTreeSelect)),
    valueType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  upload: {
    component: lazy(() => import('naive-ui/es/upload').then(m => m.NUpload)),
  },
}

export function getSchemaComponentAdapter(component?: SchemaComponentName | string) {
  return component ? (schemaComponentRegistry as Record<string, SchemaComponentAdapter>)[component] : undefined
}

export function registerSchemaComponent(name: string, adapter: SchemaComponentAdapter) {
  ;(schemaComponentRegistry as Record<string, SchemaComponentAdapter>)[name] = adapter
}

export function extendSchemaComponents(registry: SchemaComponentRegistry) {
  Object.assign(schemaComponentRegistry, registry)
}
