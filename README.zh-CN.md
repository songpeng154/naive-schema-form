# naive-schema-form

中文 | [English](./README.md)

基于 Vue 3 和 Naive UI 的 Schema 驱动表单组件库。

### 为什么选择 Naive Schema Form？

在中后台业务开发中，表单通常涉及逻辑校验、响应式布局、嵌套和动态联动等需求。使用传统的 HTML 模板语法管理这些逻辑，容易导致 Vue 文件变得臃肿且难以维护。

**Naive Schema Form** 通过 **JSON 配置（Schema）** 的方式定义表单，将表单结构与模板分离，便于集中管理业务逻辑。

### 核心特性

- **Schema 驱动**：使用纯 JS 对象描述动态表单，保持 Vue 模板清爽可读。
- **Hooks 架构**：提供 `useSchemaForm` 等组合式 API，将表单状态、操作与 UI 渲染解耦。
- **内置业务形态**：提供常用的业务表单组件：
  - **SearchSchemaForm**：带折叠/展开功能的查询表单。
  - **GroupSchemaForm**：按卡片区块分割配置的分组表单。
  - **PopupSchemaForm**：结合 Modal 或 Drawer 的弹窗表单，支持关闭提醒。
- **TypeScript 支持**：提供组件配置和方法调用的类型推导。
- **自适应栅格**：内置 Grid 系统，支持响应式布局。
- **自定义组件扩展**：支持全局注册业务组件并保留类型提示。

---

### 📦 安装

```bash
# 请确保你的项目中已经安装了 vue 和 naive-ui
pnpm add naive-schema-form naive-ui vue
```

### 🚀 快速开始 (基础表单)

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import 'naive-schema-form/style.css' // 必须引入核心样式

const model = ref({ name: '', city: null, isActive: false })

const { register, validate } = useSchemaForm(model, {
  labelPlacement: 'top',
  gridProps: { cols: 24, xGap: 24 },
  
  schema: [
    { 
      field: 'name', 
      label: '姓名', 
      component: 'input', 
      required: true, 
      gridItemProps: 24 
    },
    {
      field: 'isActive',
      label: '是否启用',
      component: 'switch',
      gridItemProps: 12
    },
    {
      field: 'city',
      label: '城市',
      component: 'select',
      gridItemProps: 12,
      // 根据其他字段的值动态显示/隐藏
      hide: ({ model }) => !model.isActive,
      componentProps: {
        options: [{ label: '深圳', value: 'shenzhen' }],
      }
    },
  ]
})

const onSubmit = async () => {
  await validate()
  console.log('校验通过!', model.value)
}
</script>

<template>
  <SchemaForm v-bind="register" />
  <button @click="onSubmit">提交</button>
</template>
```

---

### 🎯 进阶变体表单示例

#### 1. SearchSchemaForm (查询表单)
常用于条件筛选，提供查询/重置操作，并支持超出指定数量的字段折叠。

```vue
<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'

const { register } = useSearchSchemaForm(model, {
  searchShowNumber: 3, // 超过 3 个字段自动折叠
  enableCollapsed: true, // 允许折叠展开
  onSubmit: async (validateFunc, currentModel) => {
    await validateFunc()
    // 触发请求表格数据
  },
  schema: [
    /* ... 大量筛选条件字段 ... */
  ]
})
</script>

<template>
  <SearchSchemaForm v-bind="register" />
</template>
```

#### 2. PopupSchemaForm (弹窗表单)
结合 Modal 或 Drawer 使用，内置 `visible` 和 `loading` 状态管理，并支持 `confirmOnClose` 机制。

```vue
<script setup lang="ts">
import { PopupSchemaForm, usePopupSchemaForm } from 'naive-schema-form'

const { register, openPopup } = usePopupSchemaForm(model, {
  type: 'modal', // 或 'drawer'
  title: '编辑用户信息',
  width: '600px',
  resetOnClose: true, // 关闭后自动重置表单
  confirmOnClose: true, // 如果用户有未保存的修改，关闭时会自动触发二次弹窗确认
  onSubmit: async (validateFunc, currentModel) => {
    await validateFunc()
    // 提交数据... 成功后弹窗会自动关闭
  },
  schema: [ /* ... 表单字段 ... */ ]
})
</script>

<template>
  <button @click="openPopup">打开编辑</button>
  <!-- 此组件自带 Teleport，会渲染在根节点 -->
  <PopupSchemaForm v-bind="register" />
</template>
```

#### 3. GroupSchemaForm (分组表单)
适用于需要分成多个区块展示的长表单页面。

```vue
<script setup lang="ts">
import { GroupSchemaForm, useGroupSchemaForm } from 'naive-schema-form'

const { register } = useGroupSchemaForm(model, {
  defaultCollapsed: false,
  schema: [
    {
      title: '基础信息',
      helpMessage: '此处填写您的常规配置信息', // 标题旁边的小问号提示
      form: [ /* ... 输入组件 ... */ ]
    },
    {
      title: '高级设置',
      collapsed: true, // 默认收起这个卡片
      form: [ /* ... 输入组件 ... */ ]
    }
  ]
})
</script>

<template>
  <GroupSchemaForm v-bind="register" />
</template>
```

---

### 🧩 注册自定义组件

注册自定义业务组件时，建议同时注册**运行时组件**和**增强类型**：

```ts
import { registerSchemaComponent } from 'naive-schema-form'
import BadgeInput from './BadgeInput.vue'
import CustomSelect from './CustomSelect.vue'

// 1. 增强类型声明
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

// 2. 注册组件 (支持单个或批量注册)

// 单个注册
registerSchemaComponent('badge-input', {
  component: BadgeInput,
  actionType: 'input',
  mapPlaceholder: true, // 自动映射 placeholder
})

// 批量注册
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
注册完成后，在你的 Schema 中将 `component` 设为 `'badge-input'`，`componentProps` 将自动获得提示。
