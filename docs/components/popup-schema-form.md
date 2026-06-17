# 弹窗表单 PopupSchemaForm

`PopupSchemaForm` 可以无缝地将表单嵌入到 Modal 或 Drawer 中，并且自动接管了显示/隐藏状态、防丢失保护以及重置逻辑。

## 基础使用

你可以通过解构出来的 `openPopup()` 方法来唤起弹窗。

<demo src="../demos/popup-form/basic.vue" title="模态框表单" description="尝试输入内容后点击右上角关闭，会触发防丢失拦截。" />

<demo src="../demos/popup-form/drawer.vue" title="抽屉式表单" description="切换参数即可变身为右滑的 Drawer 侧边栏模式。" />

## 核心配置

| 属性 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| `type` | 弹窗表现形式 | `'modal' \| 'drawer'` | `'modal'` |
| `title` | 弹窗的标题 | `string` | - |
| `width` | 弹窗的宽度 | `string` | - |
| `resetOnClose` | 每次关闭时是否自动重置表单字段 | `boolean` | `false` |
| `confirmOnClose` | 关闭时如果有输入数据，是否弹出二次确认提示防丢失 | `boolean` | `false` |

## 插槽

支持 `header`, `footer`, `formBefore`, `formAfter` 等位置插槽以满足高定制需求。
