import type { Component } from 'vue'
import type { SchemaComponentAdapter, SchemaComponentRegistry } from '@/components/schema-form/core/types.ts'
import type { SchemaComponentName } from '@/components/schema-form/types/component.ts'
import {
  NAutoComplete,
  NCheckbox,
  NCheckboxGroup,
  NInput,
  NInputNumber,
  NRadio,
  NRadioGroup,
  NSelect,
  NSwitch,
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
    actionType: 'input',
    mapPlaceholder: true,
  },
  select: {
    component: NSelect,
    actionType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  autoComplete: {
    component: NAutoComplete,
    actionType: 'input',
    mapPlaceholder: true,
    mapOptions: true,
  },
  checkbox: {
    component: NCheckbox,
    actionType: 'check',
    modelProp: 'checked',
  },
  checkboxGroup: {
    component: NCheckboxGroup,
    actionType: 'check',
  },
  datePicker: {
    component: lazy(() => import('naive-ui/es/date-picker').then(m => m.NDatePicker)),
    actionType: 'date',
    mapPlaceholder: true,
  },
  inputNumber: {
    component: NInputNumber,
    actionType: 'input',
    mapPlaceholder: true,
  },
  radio: {
    component: NRadio,
    actionType: 'check',
    modelProp: 'checked',
  },
  radioGroup: {
    component: NRadioGroup,
    actionType: 'check',
  },
  switch: {
    component: NSwitch,
    actionType: 'check',
  },
  timePicker: {
    component: lazy(() => import('naive-ui/es/time-picker').then(m => m.NTimePicker)),
    actionType: 'time',
    mapPlaceholder: true,
  },
  cascader: {
    component: lazy(() => import('naive-ui/es/cascader').then(m => m.NCascader)),
    actionType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  colorPicker: {
    component: lazy(() => import('naive-ui/es/color-picker').then(m => m.NColorPicker)),
    actionType: 'select',
  },
  dynamicInput: {
    component: lazy(() => import('naive-ui/es/dynamic-input').then(m => m.NDynamicInput)),
    actionType: 'input',
    mapPlaceholder: true,
  },
  dynamicTags: {
    component: lazy(() => import('naive-ui/es/dynamic-tags').then(m => m.NDynamicTags)),
    actionType: 'input',
  },
  mention: {
    component: lazy(() => import('naive-ui/es/mention').then(m => m.NMention)),
    actionType: 'input',
    mapPlaceholder: true,
    mapOptions: true,
  },
  rate: {
    component: lazy(() => import('naive-ui/es/rate').then(m => m.NRate)),
    actionType: 'default',
  },
  slider: {
    component: lazy(() => import('naive-ui/es/slider').then(m => m.NSlider)),
    actionType: 'default',
  },
  transfer: {
    component: lazy(() => import('naive-ui/es/transfer').then(m => m.NTransfer)),
    actionType: 'default',
    mapOptions: true,
  },
  treeSelect: {
    component: lazy(() => import('naive-ui/es/tree-select').then(m => m.NTreeSelect)),
    actionType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  upload: {
    component: lazy(() => import('naive-ui/es/upload').then(m => m.NUpload)),
    actionType: 'upload',
  },
}

export function getSchemaComponentAdapter(component?: SchemaComponentName | string) {
  return component ? (schemaComponentRegistry as Record<string, SchemaComponentAdapter>)[component] : undefined
}

export function registerSchemaComponent(name: string, adapter: SchemaComponentAdapter): void
export function registerSchemaComponent(components: SchemaComponentRegistry): void
export function registerSchemaComponent(
  nameOrComponents: string | SchemaComponentRegistry,
  adapter?: SchemaComponentAdapter,
) {
  if (typeof nameOrComponents === 'string') {
    if (adapter) {
      schemaComponentRegistry[nameOrComponents] = adapter
    }
  }
  else {
    Object.assign(schemaComponentRegistry, nameOrComponents)
  }
}

export function extendSchemaComponents(registry: SchemaComponentRegistry) {
  Object.assign(schemaComponentRegistry, registry)
}
