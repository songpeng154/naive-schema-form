# 查询表单 SearchSchemaForm

`SearchSchemaForm` 是专为表格查询、过滤头部而设计的变体表单。它内置了自动折叠逻辑和默认的“搜索/重置”按钮。

## 基本使用

设定 `searchShowNumber` 后，超出该数量的表单项将被自动隐藏，并显示“展开/收起”按钮。

<demo src="../demos/search-form/basic.vue" title="可折叠的搜索表单" description="体验默认的折叠展开以及内置搜索按钮。" />

## 常用 API

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `searchShowNumber` | 折叠前展示的表单项数量 | `number` | `3` |
| `enableCollapsed` | 是否启用折叠功能 | `boolean` | `true` |
| `collapsedText` | 折叠时的提示文字 | `string` | `'展开'` |
| `expandedText` | 展开时的提示文字 | `string` | `'收起'` |

## 事件钩子

```ts
const { register } = useSearchSchemaForm(model, {
  // 提交并自动触发表单验证
  onSubmit: async (validate, model) => {
    await validate()
    fetchData(model)
  },
  // 重置表单
  onReset: (resetFields, model) => {
    resetFields()
    fetchData(model)
  }
})
```
