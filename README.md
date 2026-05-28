# naive-schema-form

Schema-driven form components for Vue 3 + Naive UI.

## Install

```bash
pnpm add naive-schema-form naive-ui vue
```

## Usage

```vue
<script setup lang="ts">
import { reactive, ref } from 'vue'
import { SchemaForm, type DefineSchema } from 'naive-schema-form'
import 'naive-schema-form/style.css'

const model = reactive({
  name: '',
  city: null,
})

const schema = ref<DefineSchema[]>([
  { field: 'name', label: '姓名', component: 'input', showRequireMark: true },
  {
    field: 'city',
    label: '城市',
    component: 'select',
    options: [{ label: '深圳', value: 'shenzhen' }],
  },
])
</script>

<template>
  <SchemaForm v-model:model="model" v-model:schema="schema" />
</template>
```

## Exports

- `SchemaForm`
- `SearchSchemaForm`
- `GroupSchemaForm`
- `PopupSchemaForm`
- `Grid`
- `GridItem`
- `schemaComponentRegistry`
- `registerSchemaComponent`
- `extendSchemaComponents`

## Scripts

```bash
pnpm playground
pnpm typecheck
pnpm test --run
pnpm build
```

## Current Notes

- This package is Naive UI specific.
- `vue` and `naive-ui` are peer dependencies.
- Project-specific icon components were removed; custom components can be added through the registry helpers.

## Custom Components

自定义组件建议同时注册运行时组件和增强类型：

```ts
import { registerSchemaComponent } from 'naive-schema-form'

declare module 'naive-schema-form' {
  interface SchemaCustomComponentPropsMap {
    badgeInput: {
      prefix?: string
    }
  }
}

registerSchemaComponent('badgeInput', {
  component: BadgeInput,
  valueType: 'input',
  mapPlaceholder: true,
})
```

之后 `DefineSchema<Model, 'badgeInput'>` 的 `componentProps` 会按增强后的 props 推导。
