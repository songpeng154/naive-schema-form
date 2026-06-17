# 简介

`naive-schema-form` 是一个专为中后台业务打造的、基于 Vue 3 和 Naive UI 的高度定制化表单解决方案。

## 动机 (Motivation)

在构建复杂的 B 端系统或 Admin 管理后台时，传统的模板驱动（Template-driven）表单往往会导致以下痛点：
1. **模板臃肿**：当表单项多达几十项，且各自带有显隐逻辑、校验规则时，`<template>` 代码会急剧膨胀。
2. **逻辑穿插**：数据模型（Model）与 UI 代码耦合严重，难以阅读和维护。
3. **重复工作**：大量的 `placeholder`、`options` 等属性需要手动编写，浪费时间。

本库的核心思路是 **配置驱动 (Schema-Driven)**，将所有的表单描述抽象为 JSON 数据（JS 对象），从而彻底解放开发者对 DOM 和模板的关注。

## 核心亮点

- **自动推导与映射**：得益于底层的 Adapter 层，当你指定 `component: 'select'` 时，不仅能获得完整的 TypeScript 属性推断，底层还会自动补充 `placeholder="请选择"` 等重复性逻辑。
- **Hooks 控制**：告别繁琐的 `ref` 绑定，一切操作由 `useSchemaForm`（及其变体）接管，自动搜集实例、进行验证或重置。
- **自研布局引擎**：完全无缝集成 Naive UI 栅格响应式，同时对 `Schema` 暴露了极简的 `gridItemProps` 属性。
- **四大业务变体**：
  - **基础表单** (`SchemaForm`)
  - **查询表单** (`SearchSchemaForm`)：自动接管筛选条件折叠逻辑。
  - **弹窗表单** (`PopupSchemaForm`)：内置 Modal/Drawer 封装及离开未保存拦截。
  - **分组表单** (`GroupSchemaForm`)：大表单分块化管理。
