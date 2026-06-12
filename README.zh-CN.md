# naive-schema-form

中文 | [English](./README.md)

基于 Vue 3 和 Naive UI 的 Schema 驱动表单组件库。

### 为什么选择 Naive Schema Form？

在中后台业务开发中，表单往往占据了巨大的开发成本。复杂的逻辑校验、响应式栅格布局、表单嵌套、动态联动……如果依靠传统的 HTML 模板语法，很容易导致 Vue 文件迅速膨胀至成百上千行，不仅难以阅读，维护更是灾难。

**Naive Schema Form** 旨在通过 **JSON 配置（Schema）** 的方式接管表单开发。它能让你从繁杂的 DOM 模板中彻底解脱出来，将关注点重新聚焦于核心的业务数据流。

### 核心特性

- **Schema 驱动**：使用纯 JS 对象描述动态表单，保持 Vue 模板清爽可读。
- **Hooks 架构**：提供 `useSchemaForm` 等组合式 API，将表单状态、操作与 UI 渲染解耦。
- **内置业务形态**：提供开箱即用的高频业务表单组件：
  - **SearchSchemaForm**：自带高级折叠/展开逻辑的查询表单。
  - **GroupSchemaForm**：按卡片区块分割配置的分组表单。
  - **PopupSchemaForm**：无缝嵌入 Modal 或 Drawer，自带防误触关闭保护的弹窗表单。
- **完美的 TypeScript 提示**：无论是组件配置还是方法调用，均提供精确的智能推导。
- **自适应栅格**：内置无缝整合的 Grid 系统，轻松掌控全局及局部响应式布局。
- **自定义组件扩展**：提供极简的全局注册机制，轻松接入业务组件并保留完整的 TS 类型提示。

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
常用于表格顶部的条件筛选，自带“查询/重置”按钮，并支持字段超出数量自动折叠。

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
将表单完美融合进 Modal 或 Drawer 中，免去你手动维护 `visible` 和按钮 `loading` 的烦恼，且支持极其贴心的 `confirmOnClose` 机制防误触。

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
适用于非常长、需要分成多个区块（Card）展示的复杂表单页面。

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

在使用自定义业务组件时，建议同时注册**运行时组件**和**增强类型**，以获得完美的代码提示：

```ts
import { registerSchemaComponent } from 'naive-schema-form'
import BadgeInput from './BadgeInput.vue'

// 1. 增强类型声明
declare module 'naive-schema-form' {
  interface SchemaCustomComponentPropsMap {
    badgeInput: {
      prefix?: string
    }
  }
}

// 2. 注册组件
registerSchemaComponent('badgeInput', {
  component: BadgeInput,
  valueType: 'input',
  mapPlaceholder: true, // 自动映射 placeholder
})
```
注册完成后，在你的 Schema 中将 `component` 设为 `'badgeInput'`，`componentProps` 将自动获得提示。
