# 查询表单 SearchSchemaForm

`SearchSchemaForm` 是专为**数据表格上方的高级查询过滤区**而设计的场景化组件。

它底层完全继承了 `SchemaForm` 的所有配置与解析逻辑，但在外观交互上做了极大的**开箱即用优化**：
1. **默认采用行内网格布局**（`inline: true`、动态栅格列宽）。
2. 默认将 `Label` 位置置于输入框左侧（`labelPlacement: 'left'`、`labelAlign: 'right'`）。
3. 默认带有**“搜索”**和**“重置”**操作按钮，并且自动将其吸附到最后一列的右侧。
4. 内置**自动折叠收起逻辑**。

---

## 基础用法

只要传入 `model` 和 `schema`，你就能立刻得到一个排版工整、按钮对齐的查询区。

<demo src="../demos/search-form/basic.vue" title="基础查询表单" description="默认的响应式栅格布局与右对齐的操作按钮。" />

## 展开与折叠

当业务的搜索条件非常多时，平铺展示会占据大量屏幕空间。
默认情况下 `SearchSchemaForm` 开启了 `enableCollapsed: true` 且 `searchShowNumber: 3`（显示 3 个字段）。只要 Schema 中的字段数超过该值，多余的字段就会被隐藏，并且在按钮区旁边自动长出一个“展开/收起”按钮。

<demo src="../demos/search-form/collapsed.vue" title="条件折叠" description="演示超过指定数量（示例为2）时的条件隐藏与展开逻辑。" />

## 覆盖栅格布局

尽管内部配置了默认的响应式断点栅格（如 `span: { xs: 24, sm: 12, ... }`），你依然可以通过传入全局的 `gridItemProps` 强制覆盖默认宽度。

<demo src="../demos/search-form/custom-layout.vue" title="覆写栅格宽度" description="强制将每个表单项占位设置为 12（半行）。" />

## 操作区拓展

如果默认的“搜索”和“重置”按钮无法满足需求，或者你需要在此追加“导出”、“新建”等操作，可以直接利用 `#actionsBefore` 或 `#actionsAfter` 插槽注入。

<demo src="../demos/search-form/custom-actions.vue" title="自定义操作按钮" description="在默认按钮的前方插入额外的导出按钮。" />

---

## Props

作为 `SchemaForm` 的超集，`SearchSchemaForm` 支持 `SchemaForm` 的所有配置项（包括 `schema`、`model`、`gridProps` 等），同时扩展了专门用于折叠功能的属性。

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `enableCollapsed` | `boolean` | `true` | 是否启用自动折叠逻辑。关闭后会平铺展示所有表单项，且隐藏折叠按钮。 |
| `searchShowNumber` | `number` | `3` | 表单在收起状态下，可见的表单项最大数量。超出部分会被隐藏。 |
| `collapsed` | `boolean` | `true` | 当前是否处于折叠状态，可通过 `v-model:collapsed` 双向绑定。 |
| `collapsedText` | `string` | `'展开'` | 折叠状态下按钮上显示的提示文本。 |
| `expandedText` | `string` | `'收起'` | 展开状态下按钮上显示的提示文本。 |

> 注：底层默认注入了 `inline: true`、`labelPlacement: 'left'`、`submitText: '搜索'` 等预设，但如果外部显式传递，则会优先使用外部参数。

## Emits / 事件钩子

继承所有 `SchemaForm` 的事件，常用于查询的是 `submit` 与 `reset`。

| 事件名/属性名 | 回调参数 | 说明 |
| --- | --- | --- |
| `update:collapsed` | `(value: boolean)` | 折叠状态变化时触发。 |
| `submit` / `onSubmit` | `(validate: () => Promise<void>, model: Recordable)` | 点击“搜索”按钮时触发。接收校验方法和查询参数。 |
| `reset` / `onReset` | `(validate: () => void, model: Recordable)` | 点击“重置”按钮时触发。 |

## Expose 实例方法

获取表单实例后（或从 Hook 返回值中），除了可以调用基础表单的 `validate`、`resetFields` 外，还可以调用查询表单专用的控制方法。

| 方法名 | 类型签名 | 说明 |
| --- | --- | --- |
| `toggleCollapsed` | `(isCollapsed?: boolean) => void` | 手动切换表单的展开/折叠状态。如果传入布尔值则强制设置该状态。 |

## useSearchSchemaForm

在 Composition API 场景下，我们推荐使用 `useSearchSchemaForm` 以获得完善的 TS 类型推导。

```ts
const { register, validate, resetFields, toggleCollapsed } = useSearchSchemaForm(model, optionsOrSchema)
```

用法和签名与核心的 `useSchemaForm` 完全一致，仅对底层 Hook 的类型约束和智能提示做了针对 `SearchSchemaFormProps` 的适配和增强。
