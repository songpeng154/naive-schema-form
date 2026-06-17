# 栅格与布局 Grid

在 B 端系统中，表单项的排版极为重要。`naive-schema-form` 放弃了繁琐的基于原生 `<n-grid>` 穿插在 `<template>` 里的写法，自己实现了一套无缝集成的响应式布局引擎。

## 全局布局 (gridProps)

你可以给 `useSchemaForm` 传入 `gridProps`，来决定这整个表单默认一排显示多少个元素，以及横纵间距。

```ts
const { register } = useSchemaForm(model, {
  gridProps: {
    cols: 24, // 采用 24 栅格系统
    xGap: 16, // 水平间距
    yGap: 16  // 垂直间距
  },
  schema: []
})
```

## 单项布局 (gridItemProps)

对于某一个具体的 `schema`，你可以通过 `gridItemProps` 覆盖它的具体占位表现。

### 1. 固定占位

```ts
{
  field: 'username',
  label: '用户名',
  component: 'input',
  gridItemProps: 12 // 占据 24 栅格里的 12 格（即 50% 宽度）
}
```

### 2. 响应式占位

完全兼容 Naive UI 响应式断点（`xs`, `sm`, `md`, `lg`, `xl`），方便编写自适应的页面：

```ts
{
  field: 'username',
  label: '用户名',
  component: 'input',
  gridItemProps: {
    span: {
      xs: 24, // 手机端占满全宽
      sm: 12, // 平板占一半
      md: 8   // 桌面端占三分之一
    }
  }
}
```
