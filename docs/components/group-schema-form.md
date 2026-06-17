# 分组表单 GroupSchemaForm

在面对拥有数十上百个配置项的大型表单时，我们通常需要将其划分为多个独立的区块或卡片。`GroupSchemaForm` 为此场景量身打造。

## 基础使用

它的 `schema` 结构和普通表单不同，第一层是分组的配置（如 `title`），第二层的 `form` 才是真正的表单项定义。

<demo src="../demos/group-form/basic.vue" title="分组表单" description="支持独立折叠状态、动态隐藏分组内的表单。" />

## 分组 Schema 属性

| 属性 | 说明 | 类型 |
| --- | --- | --- |
| `title` | 模块标题 | `string` |
| `helpMessage` | 标题旁的帮助提示信息 | `string` |
| `collapsed` | 是否默认折叠 | `boolean` |
| `hide` | 是否隐藏该分组 | `boolean \| (params) => boolean` |
| `form` | 该组下的具体表单定义 | `DefineSchema[]` |
