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

/**
 * 全局 Schema 组件注册表，存储内置及外部注册的组件适配器
 */
export const schemaComponentRegistry: SchemaComponentRegistry = {
  'input': {
    component: NInput,
    actionType: 'input',
    mapPlaceholder: true,
  },
  'select': {
    component: NSelect,
    actionType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  'auto-complete': {
    component: NAutoComplete,
    actionType: 'input',
    mapPlaceholder: true,
    mapOptions: true,
  },
  'checkbox': {
    component: NCheckbox,
    actionType: 'check',
    modelProp: 'checked',
  },
  'checkbox-group': {
    component: NCheckboxGroup,
    actionType: 'check',
  },
  'date-picker': {
    component: lazy(() => import('naive-ui/es/date-picker').then(m => m.NDatePicker)),
    actionType: 'date',
    mapPlaceholder: true,
  },
  'input-number': {
    component: NInputNumber,
    actionType: 'input',
    mapPlaceholder: true,
  },
  'radio': {
    component: NRadio,
    actionType: 'check',
    modelProp: 'checked',
  },
  'radio-group': {
    component: NRadioGroup,
    actionType: 'check',
  },
  'switch': {
    component: NSwitch,
    actionType: 'check',
  },
  'time-picker': {
    component: lazy(() => import('naive-ui/es/time-picker').then(m => m.NTimePicker)),
    actionType: 'time',
    mapPlaceholder: true,
  },
  'cascader': {
    component: lazy(() => import('naive-ui/es/cascader').then(m => m.NCascader)),
    actionType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  'color-picker': {
    component: lazy(() => import('naive-ui/es/color-picker').then(m => m.NColorPicker)),
    actionType: 'select',
  },
  'dynamic-input': {
    component: lazy(() => import('naive-ui/es/dynamic-input').then(m => m.NDynamicInput)),
    actionType: 'input',
    mapPlaceholder: true,
  },
  'dynamic-tags': {
    component: lazy(() => import('naive-ui/es/dynamic-tags').then(m => m.NDynamicTags)),
    actionType: 'input',
  },
  'mention': {
    component: lazy(() => import('naive-ui/es/mention').then(m => m.NMention)),
    actionType: 'input',
    mapPlaceholder: true,
    mapOptions: true,
  },
  'rate': {
    component: lazy(() => import('naive-ui/es/rate').then(m => m.NRate)),
    actionType: 'default',
  },
  'slider': {
    component: lazy(() => import('naive-ui/es/slider').then(m => m.NSlider)),
    actionType: 'default',
  },
  'transfer': {
    component: lazy(() => import('naive-ui/es/transfer').then(m => m.NTransfer)),
    actionType: 'default',
    mapOptions: true,
  },
  'tree-select': {
    component: lazy(() => import('naive-ui/es/tree-select').then(m => m.NTreeSelect)),
    actionType: 'select',
    mapPlaceholder: true,
    mapOptions: true,
  },
  'upload': {
    component: lazy(() => import('naive-ui/es/upload').then(m => m.NUpload)),
    actionType: 'upload',
  },
}

/**
 * 获取指定名称的组件适配器
 * @param component 组件名称
 */
export function getSchemaComponentAdapter(component?: SchemaComponentName | string) {
  return component ? (schemaComponentRegistry as Record<string, SchemaComponentAdapter>)[component] : undefined
}

/**
 * 注册自定义 Schema 组件，支持单个注册和批量注册
 * @param name 组件名称
 * @param adapter 组件适配器配置
 */
export function registerSchemaComponent(name: string, adapter: SchemaComponentAdapter): void
/**
 * 批量注册自定义 Schema 组件
 * @param components 组件注册字典
 */
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
