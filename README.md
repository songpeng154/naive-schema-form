# naive-schema-form

[中文](./README.zh-CN.md) | English

Schema-driven form components for Vue 3 + Naive UI.

### Motivation

Building forms in enterprise applications often involves handling validations, responsive layouts, nested fields, and dynamic visibilities. Managing these through raw template syntax can lead to complex and hard-to-maintain Vue files.

`naive-schema-form` addresses this by shifting form definitions from HTML templates to **JSON schemas**, allowing you to manage forms programmatically and separate UI from data flow.

### Core Features

- **Schema-Driven**: Define forms using JavaScript objects instead of template markup.
- **Hooks Architecture**: Uses Composition API (`useSchemaForm`) to separate form state from the UI.
- **Form Variants**: Includes components for common scenarios:
  - **Search Form**: Includes auto-collapse functionality for table filters.
  - **Group Form**: Splits large forms into independent card sections.
  - **Popup Form**: Embeds forms into Modals or Drawers with unsaved-changes prompts.
- **TypeScript Support**: Provides type inference for component props based on the selected component type.
- **Grid Layout**: Built-in Grid system for responsive form layouts.
- **Custom Components**: Register custom components globally with type support.

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
Collapses excess query fields and provides Search/Reset buttons.

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
Manages modal visibility and loading states.

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
Splits large configuration forms into sections.

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

Register custom components and extend their types:

```ts
import { registerSchemaComponent } from 'naive-schema-form'
import BadgeInput from './BadgeInput.vue'
import CustomSelect from './CustomSelect.vue'

// 1. Extend Types
declare module 'naive-schema-form' {
  interface SchemaCustomComponentPropsMap {
    'badge-input': {
      prefix?: string
    }
    'custom-select': {
      multiple?: boolean
    }
  }
}

// 2. Register Runtime Component(s)

// Single Registration
registerSchemaComponent('badge-input', {
  component: BadgeInput,
  actionType: 'input',
  mapPlaceholder: true,
})

// Batch Registration
registerSchemaComponent({
  'badge-input': {
    component: BadgeInput,
    actionType: 'input',
    mapPlaceholder: true,
  },
  'custom-select': {
    component: CustomSelect,
    actionType: 'select',
    mapOptions: true,
  }
})
```
