# naive-schema-form

[中文](./README.zh-CN.md) | English

Schema-driven form components for Vue 3 + Naive UI.

### Motivation

Building complex forms in enterprise applications (B2B/Admin dashboards) is traditionally a massive time sink. Handling intricate validations, responsive layouts, nested fields, and dynamic visibilities using raw template syntax often results in monolithic, unmaintainable Vue files.

`naive-schema-form` was born to solve this. By shifting form definitions from HTML templates to **JSON schemas**, it frees you from DOM manipulation and lets you focus on what really matters: your business data flow.

### Core Features

- **Schema-Driven**: Describe dynamic forms using pure JS objects to keep your Vue templates clean and maintainable.
- **Hooks Architecture**: Fully embraces the Composition API (`useSchemaForm`, etc.) to decouple form state and actions from the UI layer.
- **Business-Ready Variants**: Out-of-the-box solutions for high-frequency scenarios:
  - **Search Form**: Perfect for table headers with built-in auto-collapse and expand logic.
  - **Group Form**: Designed for massive configuration pages, split into independent card sections.
  - **Popup Form**: Seamlessly embed forms into Modals or Drawers with unsaved-changes protection.
- **Flawless TypeScript Inference**: Enjoy perfect type inference—defining `component: 'select'` instantly grants you `naive-ui`'s native `SelectProps` autocomplete.
- **Responsive Grid Engine**: Manage complex responsive layouts effortlessly with the built-in highly flexible Grid system.
- **Extensible Ecosystem**: Register your own business components globally with a single line of code, while retaining full TypeScript support.

---

### 📦 Install

```bash
# naive-ui and vue are required peer dependencies
pnpm add naive-schema-form naive-ui vue
```

### 🚀 Quick Start (Basic Form)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import 'naive-schema-form/style.css' // Required CSS

const model = ref({ name: '', city: null, isActive: false })

const { register, validate } = useSchemaForm(model, {
  // Built-in form configuration
  labelPlacement: 'top',
  gridProps: { cols: 24, xGap: 24 },
  
  schema: [
    { 
      field: 'name', 
      label: 'Name', 
      component: 'input', 
      required: true, 
      gridItemProps: 24 
    },
    {
      field: 'isActive',
      label: 'Is Active',
      component: 'switch',
      gridItemProps: 12
    },
    {
      field: 'city',
      label: 'City',
      component: 'select',
      gridItemProps: 12,
      // Dynamic visibility based on another field
      hide: ({ model }) => !model.isActive, 
      componentProps: {
        options: [{ label: 'Shenzhen', value: 'shenzhen' }],
      }
    },
  ]
})

const onSubmit = async () => {
  await validate()
  console.log('Valid!', model.value)
}
</script>

<template>
  <SchemaForm v-bind="register" />
  <button @click="onSubmit">Submit</button>
</template>
```

---

### 🎯 Form Variants Examples

#### 1. SearchSchemaForm (Table Query Headers)
Automatically collapses excess query fields and provides built-in Search/Reset buttons.

```vue
<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'

const { register } = useSearchSchemaForm(model, {
  searchShowNumber: 3, // Auto collapse fields after the 3rd one
  enableCollapsed: true, // Toggle collapse functionality
  onSubmit: async (validateFunc, currentModel) => {
    await validateFunc()
    // Trigger table fetch with currentModel
  },
  schema: [
    /* ... lots of fields ... */
  ]
})
</script>

<template>
  <SearchSchemaForm v-bind="register" />
</template>
```

#### 2. PopupSchemaForm (Modal/Drawer Forms)
Manage modal visibility and loading states automatically without cluttering your template.

```vue
<script setup lang="ts">
import { PopupSchemaForm, usePopupSchemaForm } from 'naive-schema-form'

const { register, openPopup } = usePopupSchemaForm(model, {
  type: 'modal', // Or 'drawer'
  title: 'Edit User',
  width: '600px',
  resetOnClose: true, // Auto reset fields on close
  confirmOnClose: true, // Warn users if they have unsaved changes
  onSubmit: async (validateFunc, currentModel) => {
    await validateFunc()
    // Submit data... the modal will auto close on success
  },
  schema: [ /* ... fields ... */ ]
})
</script>

<template>
  <button @click="openPopup">Edit</button>
  <!-- Rendered via Teleport inside -->
  <PopupSchemaForm v-bind="register" />
</template>
```

#### 3. GroupSchemaForm (Complex Grouped Forms)
Ideal for massive configuration pages split into sections.

```vue
<script setup lang="ts">
import { GroupSchemaForm, useGroupSchemaForm } from 'naive-schema-form'

const { register } = useGroupSchemaForm(model, {
  defaultCollapsed: false,
  schema: [
    {
      title: 'Basic Information',
      helpMessage: 'General settings for this entity',
      form: [ /* ... inputs ... */ ]
    },
    {
      title: 'Advanced Settings',
      collapsed: true, // Start collapsed
      form: [ /* ... inputs ... */ ]
    }
  ]
})
</script>

<template>
  <GroupSchemaForm v-bind="register" />
</template>
```

---

### 🧩 Custom Components

You can easily register custom components and extend their types:

```ts
import { registerSchemaComponent } from 'naive-schema-form'
import BadgeInput from './BadgeInput.vue'

// 1. Extend Types
declare module 'naive-schema-form' {
  interface SchemaCustomComponentPropsMap {
    badgeInput: {
      prefix?: string
    }
  }
}

// 2. Register Runtime Component
registerSchemaComponent('badgeInput', {
  component: BadgeInput,
  valueType: 'input',
  mapPlaceholder: true,
})
```
