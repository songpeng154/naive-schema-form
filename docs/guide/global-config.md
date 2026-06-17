# 全局配置

如果你的项目中存在大量一致性的表单规范（如：全部使用顶栏标签、特定的提交按钮文字等），建议使用全局配置，以避免在每个表单中重复定义属性。

`naive-schema-form` 采用了类似 `NConfigProvider` 的依赖注入（Provide/Inject）模式来实现全局默认配置。

## 注册全局配置

在应用顶层（如 `App.vue`），引入并调用 `provideNaiveSchemaFormConfig`。

```vue
<script setup lang="ts">
import { provideNaiveSchemaFormConfig } from 'naive-schema-form'

provideNaiveSchemaFormConfig({
  schemaForm: {
    // 覆盖 SchemaForm (基础表单) 的默认属性
    base: {
      labelPlacement: 'left',
      labelWidth: 100,
      showRequireMark: true,
      submitText: '保存数据'
    },
    // 覆盖 SearchSchemaForm (查询表单) 的默认属性
    search: {
      searchShowNumber: 4, // 默认显示 4 个搜索项
      collapsedText: '查看更多条件',
      expandedText: '收起条件'
    }
  }
})
</script>

<template>
  <router-view />
</template>
```

## 配置优先级

当你配置了全局默认值后，任何独立的 SchemaForm 组件在使用时依然可以通过显式传入的 props 来覆盖全局设置：

```ts
// 即使全局设置了 labelPlacement 为 'left'
// 本次调用依然优先使用 'top'
const { register } = useSchemaForm(model, {
  labelPlacement: 'top',
  schema: [ ... ]
})
```
