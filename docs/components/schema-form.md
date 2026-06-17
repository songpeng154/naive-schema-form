# 基础表单 SchemaForm

`SchemaForm` 是最核心的表单组件，接管底层的插槽分发、数据劫持、栅格渲染以及自动化逻辑。

## 基础用法 (默认布局)

默认情况下，表单项会独占一行。只需极少的配置，即可生成表单，并且会自动推导出 `placeholder`。

<demo src="../demos/schema-form/basic.vue" title="基础单列用法" description="最简洁的纵向表单布局。" />

## 两列布局

利用底层 24 列的栅格系统，只需在表单全局配置中下发 `gridItemProps: 12` 即可轻松实现完美的等宽两列排版。

> [!TIP]
> **关于 gridItemProps 的简写**
> 
> `gridItemProps` 既可以直接传入一个数字（作为 `span` 的简写），也可以传入一个完整对象。
> 例如写法 `gridItemProps: 12` 等价于传入具有 span 属性的对象。

<demo src="../demos/schema-form/grid-two-columns.vue" title="两列等宽排版" description="自动对齐的两列表单。" />

## 混合排版

对于复杂的业务表单，往往需要有的字段占一行，有的占半行。我们通过 `gridItemProps.span` 参数，可以对每个表单项的占比进行独立控制。

<demo src="../demos/schema-form/grid-mixed.vue" title="复杂混合排版" description="结合 cols: 24 实现灵活的栅格排版。" />

## 隐藏 Label

当业务上需要极其紧凑的视图（例如纯依靠 placeholder 提示）时，可以通过配置 `showLabel: false` 一键隐藏所有标签。

<demo src="../demos/schema-form/hide-label.vue" title="隐藏 Label 展示" description="去除了 Label 的紧凑表单。" />

## 所有内置表单类型一览

底层对齐了 Naive UI 最常用的十余种数据录入组件，统一了数据绑定的心智。

<demo src="../demos/schema-form/all-components.vue" title="全组件矩阵" description="涵盖几乎所有原生输入组件类型的映射支持。" />

## 动态联动与显隐

在实际业务场景中，我们经常遇到表单项之间需要互相联动的需求。`SchemaForm` 底层对各种属性进行了动态解析包装，几乎所有关键属性都支持多种响应式动态写法：

1. **直接绑定 Vue `ref` 或 `computed`**：直接传递响应式对象，属性值会自动随之响应更新。
2. **函数回调模式**：属性支持配置为 `(params: CallbackParams) => T` 函数，参数包含 `{ model, value, field }`。表单内部输入变化时会自动重新求值。

具体支持动态求值的配置项包括：
- **`hide`**: 动态显隐控制。
- **`disabled`**: 动态禁用控制。
- **`required`**: 动态必填校验标记。
- **`label`**: 动态字段标题。
- **`componentProps`**: 动态组件属性（如 `placeholder`, `max` / `min` 范围等）。

<demo src="../demos/schema-form/dynamic.vue" title="动态联动与显隐" description="演示结合外部 Vue 状态、联动函数对 label、required、disabled、hide 和 componentProps 进行全方位的动态响应配置。" />


## 校验与预设规则

校验是表单最为核心的功能之一。`SchemaForm` 提供了一套极简的校验配置方案：
1. **自动必填校验 (`autoRequiredRule`)**: 只要配置 `autoRequiredRule: true` 且 schema 字段中声明了 `required: true`，组件会自动根据组件类型推导并附带合适的校验提示文字（例如“请输入...”或“请选择...”），无需手动书写冗余的 `rules`。
2. **预设校验**: 支持直接传入常见校验格式（如手机号、邮箱、网址等，敬请期待内置丰富类型）。
3. **自定义校验**: 支持直接配置 Naive UI 的 `FormItemRule` 规则。

<demo src="../demos/schema-form/validation.vue" title="表单校验与规则验证" description="展示自动必填提示、正则校验以及跨字段自定义比对校验。" />

## 嵌套多级数据双向绑定

在实际企业级业务中，表单的数据结构通常是非常复杂且多层级嵌套的 JSON 对象（如 `info.personal.name`），而不是扁平的单一对象。

`SchemaForm` 原生支持点号分割的字符串路径映射。配置 `field: 'x.y.z'` 即可无缝实现深层对象的双向绑定及自动校验，无需在表单提交或初始化时手动序列化和解包对象。

<demo src="../demos/schema-form/nested-data.vue" title="嵌套多级数据绑定" description="演示如何使用点号语法轻松绑定和操作深层对象数据。" />

## 基础组件插槽

当需要在基础输入组件（如 `NInput`, `NSelect` 等）内部注入额外内容（如前缀图标、后缀按钮）时，直接在 schema 中配置 `componentSlots` 即可。这种方式会把插槽内容直接透传给底层组件，是最轻量、最原生的自定义方式。

<demo src="../demos/schema-form/custom-component-slots.vue" title="基础组件插槽" description="演示使用 componentSlots 注入前缀和获取验证码的后缀按钮。" />

## 替换表单项内容

适用于需要接入自定义组件（如颜色选择器、富文本编辑器等），且保留底层 `NFormItem` 的样式（如 Label、校验规则、网格布局）的场景。在 Schema 中声明 `slot: 'xxx'`，并在模板中使用对应的具名插槽即可。

<demo src="../demos/schema-form/custom-slot.vue" title="替换表单项内容" description="使用 slot 具名插槽接入 NColorPicker。" />

## 自定义表单项

如果需要在表单的中间插入一段纯粹的 UI 区块（例如标题分割线、警告提示框等），这些区块根本不需要 Label 或校验外壳。此时可通过配置 `formItemSlot` 彻底替换掉底层的 `NFormItem`，实现整个表单项的自定义。

<demo src="../demos/schema-form/custom-form-item-slot.vue" title="自定义表单项" description="使用 formItemSlot 插入一段不受表单布局和 Label 束缚的警告提示块。" />

## 自定义操作区

表单底部默认提供了“提交”和“重置”按钮，如果需要增加如“保存草稿”、“返回”等按钮，可以直接利用组件开放的 `#actionsBefore`, `#actions`, `#actionsAfter` 等布局插槽。

<demo src="../demos/schema-form/custom-actions.vue" title="自定义操作区" description="演示在默认表单按钮前后追加自定义操作按钮。" />

## 外部调用方法

`useSchemaForm` 暴露了 `validate`、`restoreValidation` 和 `resetFields` 方法，无需使用 `ref` 引用即可在外部控制表单的校验与数据重置。

<demo src="../demos/schema-form/method-validate.vue" title="外部调用方法" description="演示手动触发全量校验、清除报错提示以及重置表单数据。" />

## 滚动定位

`SchemaForm` 默认开启了 `scrollToFirstError: true` 参数。当触发 `validate` 且校验失败时，页面会自动滚动到第一个报错的输入框位置。此外，也可以通过暴露的 `scrollToField` 方法手动滚动到任意指定字段。

<demo src="../demos/schema-form/method-scroll.vue" title="滚动定位" description="演示校验失败时的自动滚动，以及通过方法手动滚动到特定字段的位置。" />

## Props

该组件接受以下属性，内部包含了所有 Naive UI 的 `NForm` 的原生配置并进行了扩展。

| 属性名 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| `schema` | [`DefineSchema[]`](#defineschema) | - | **必填项**，表单的核心 Schema 配置项列表。 |
| `model` | `TModel` | - | **必填项**，表单绑定的数据模型对象。 |
| `formClass` | `string` | - | 注入到表单根节点的 CSS 类名。 |
| `formStyle` | `Partial<CSSStyleDeclaration>` | - | 注入到表单根节点的内联样式。 |
| `gridItemProps` | `number \| GridItemProps` | `24` | 作用于底层每一项 `GridItem` 的默认属性，支持跨列等网格布局。 |
| `gridProps` | `GridProps` | `{ cols: 24, yGap: 12, xGap: 12 }`| 作用于底层 `Grid` 容器的属性配置。 |
| `rules` | [`FormRules`](https://www.naiveui.com/zh-CN/os-theme/components/form#Form-Props) | - | Naive UI Form 原生验证规则。 |
| `disabled` | `boolean` | - | 禁用整个表单。 |
| `size` | `'small' \| 'medium' \| 'large'` | - | 表单组件尺寸。 |
| `inline` | `boolean` | - | 是否开启行内表单模式。 |
| `labelWidth` | `number \| string` | - | 标签宽度。 |
| `labelPlacement` | `'left' \| 'top'` | `'top'` | 标签位置。 |
| `labelAlign` | `'left' \| 'right'` | - | 标签对齐方式。 |
| `requireMarkPlacement` | `'left' \| 'right' \| 'right-hanging'` | - | 必填标记的位置。 |
| `showRequireMark` | `boolean` | - | 是否主动显示必填标记。 |
| `showLabel` | `boolean` | `true` | 是否显示表单标签。 |
| `showFeedback` | `boolean` | `true` | 是否显示表单校验反馈区域。 |
| `labelOverflowOmitted` | `boolean` | `false` | 标签超长时是否显示省略号。 |
| `validateMessages` | `Partial<FormValidateMessages>` | - | Naive UI 原生的校验文案配置。 |
| `theme` | `Theme<any, any>` | - | Naive UI 主题对象。 |
| `themeOverrides` | `ExtractThemeOverrides<Theme>` | - | Naive UI 主题覆盖参数。 |
| `builtinThemeOverrides` | `ExtractThemeOverrides<Theme>` | - | SchemaForm 提供的内置主题覆盖参数。 |
| `showActions` | `boolean` | `true` | 是否显示底部的操作按钮区域（提交、重置）。 |
| `defaultDateFormat` | `string` | `'yyyy-MM-dd HH:mm:ss'` | 默认日期组件的展示格式。 |
| `defaultTimeFormat` | `string` | `'HH:mm:ss'` | 默认时间组件的展示格式。 |
| `defaultDateValueFormat` | `string` | `'yyyy-MM-dd HH:mm:ss'` | 默认日期组件的数据值格式。 |
| `defaultTimeValueFormat` | `string` | `'HH:mm:ss'` | 默认时间组件的数据值格式。 |
| `scrollToFirstError` | `boolean` | `true` | 校验失败时，是否自动滚动到第一个报错的字段位置。 |
| `autoPlaceholder` | `boolean` | `true` | 是否根据 `label` 的文本自动推导并生成 `placeholder`。 |
| `autoRequiredRule` | `boolean` | `true` | 当 Schema 设置了 `required: true` 时，是否自动生成并附加必填校验规则。 |
| `autoLabelWidth` | `boolean` | `true` | 是否自动计算并统一表单的标签宽度。 |
| `submitLoading` | `boolean` | - | 手动控制提交按钮的 Loading 状态。 |
| `submitText` | `string` | `'提交'` | 提交按钮的文本。 |
| `resetLoading` | `boolean` | - | 手动控制重置按钮的 Loading 状态。 |
| `resetText` | `string` | `'重置'` | 重置按钮的文本。 |
| `showReset` | `boolean` | `true` | 是否显示默认的重置按钮。 |

## DefineSchema
`schema` 属性接收的数组中每一项的具体配置声明 (`SchemaBaseConfig`)。

| 属性名 | 类型 | 说明 |
| --- | --- | --- |
| `field` | `MaybeRef<FieldPaths<TForm>>` | 数据绑定的字段路径，原生支持点语法嵌套（例如：`user.address.city`）。 |
| `label` | `MaybeRef<string> \| SlotsContent \| Function`| 表单项的标签内容，支持字符串、VNode 或回调函数。 |
| `component` | `SchemaComponentName` | **联动类型**，绑定的基础组件名称（如 `NInput`, `NSelect` 等）。 |
| `componentProps` | `WrapWithMaybeRef<SchemaComponentPropsMap[Name]>`| 透传给 `component` 的组件属性。通过 TypeScript 强约束，类型会根据 `component` 自动推断。 |
| `componentSlots` | `SlotsContent \| ComponentSlots \| Function` | 直接注入给 `component` 内部的插槽内容。 |
| `modelProp` | `MaybeRef<string>` | 指定双向绑定的属性名，如 Vue 3 的 `value`。通常框架内部自动处理。 |
| `slot` | `MaybeRef<string>` | 用于自定义当前表单项内容的**具名插槽名称**。 |
| `formItemSlot` | `MaybeRef<string>` | 用于完全接管该 `formItem` 组件渲染的**具名插槽名称**。 |
| `gridItemProps` | `MaybeRef<number \| GridItemProps>` | 当前项在网格布局（Grid）中的独立参数，优先级高于全局 `gridItemProps`。 |
| `formItemProps` | [`FormItemProps`](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItem-Props) | 透传给 Naive UI `NFormItem` 的原生属性。 |
| `rules` | `MaybeRef<RulePresets \| `[`FormItemRule`](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItemRule-Type)` \| `[`FormItemRule[]`](https://www.naiveui.com/zh-CN/os-theme/components/form#FormItemRule-Type)`>`| 校验规则配置。支持自定义规则，也支持内置预设（`'mail' \| 'phone' \| 'landline' \| 'idCard' \| 'url'`）。 |
| `required` | `MaybeRef<boolean> \| Function` | 业务必填标识。支持传入函数 `(params) => boolean` 实现动态必填。 |
| `hide` | `MaybeRef<boolean> \| Function` | 控制此表单项是否隐藏。支持传入函数 `(params) => boolean` 实现动态显示隐藏。 |
| `tooltip` | `MaybeRef<string>` | 在字段 Label 旁边显示的帮助提示信息内容。 |
| `placeholder` | `MaybeRef<string>` | 快捷占位符。 |
| `startPlaceholder` | `string` | 日期/时间范围组件专属：开始时间的占位符。 |
| `endPlaceholder` | `string` | 日期/时间范围组件专属：结束时间的占位符。 |
| `options` | `MaybeRef<OptionType[]>` | 快捷选项配置（专为 Select、Radio、Checkbox 等选项类组件设计）。 |
| `disabled` | `MaybeRef<boolean> \| Function` | 快捷控制组件是否禁用，支持传入函数 `(params) => boolean` 动态判断。 |

## Emits

可以通过 `@事件名` 的方式监听，也可以通过 `:onXxxx` 传递函数（Props 形式）。

| 事件名/属性名 | 回调参数 | 说明 |
| --- | --- | --- |
| `update:model` | `(value: TModel)` | Model 数据更新时触发。 |
| `update:schema` | `(value: `[`DefineSchema[]`](#defineschema)`)` | Schema 结构变化时触发。 |
| `submit` / `onSubmit` | `(validate: () => Promise<void>, model: Recordable)` | 点击底层“提交”按钮时触发。接收原生的校验方法和当前表单数据。 |
| `finish` / `onFinish` | `(model: Recordable)` | 用户点击提交并**成功通过表单验证**后触发。 |
| `finishFailed` / `onFinishFailed` | `(error: any)` | 用户点击提交但**未能通过表单验证**时触发，抛出校验错误。 |
| `reset` / `onReset` | `(validate: () => void, model: Recordable)` | 用户点击“重置”按钮时触发。 |
| `resetAfter` / `onResetAfter`| `(model: Recordable)` | 表单默认重置逻辑执行完毕后触发。 |
| `register` | `(instance: `[`SchemaFormCommonExpose`](#expose)`) => void` | **不要手动传入**。由 `useSchemaForm` Hook 内部消费，用于组件挂载后注入实例。 |

## Slots

除了开发者在 Schema 配置中通过 `slot` 自定义的具名插槽外，组件固定提供以下布局插槽：

| 插槽名 | 参数 | 说明 |
| --- | --- | --- |
| `actions` | - | 完全自定义整个操作按钮区域（会替换掉默认的提交、重置按钮）。 |
| `actionsBefore` | - | 在默认的提交和重置按钮**之前**注入内容。 |
| `actionsAfter` | - | 在默认的提交和重置按钮**之后**注入内容。 |
| `[你定义的 slot 名称]` | `scope: CallbackParams` | `Schema` 配置项内声明的自定义插槽（包含 `model`, `field`, `value` 等上下文参数）。 |

## Expose

当您获取到表单的 `ref` 或者通过 `useSchemaForm()` 拿到实例时，可调用以下方法：

> 包含所有 `NForm` (Naive UI) 的原生实例方法，并扩展了以下专有方法。

| 方法名 | 类型签名 | 说明 |
| --- | --- | --- |
| `validate` | `(validateCallback?, shouldRuleBeApplied?) => Promise<void>` | 触发当前表单的完整校验（继承自 Naive UI）。 |
| `restoreValidation` | `() => void` | 还原表单的所有验证状态（继承自 Naive UI）。 |
| `resetFields` | `() => void` | 彻底重置表单：清空绑定的数据，同时清除所有校验报错状态。 |
| `scrollToField` | `(field: FieldPaths<TModel>) => void` | 手动控制视口滚动到指定 `field` 所对应的表单项位置。 |

## useSchemaForm

在组合式 API (Composition API) 场景下，强烈推荐使用 `useSchemaForm` Hook 来接管表单的响应式状态和方法。你可以完全免去 `ref` 模板引用的书写，直接通过 `v-bind="register"` 绑定给组件。

### 参数 (Arguments)

```ts
const { register, model, validate } = useSchemaForm(initialModel, optionsOrSchema)
```

| 参数名 | 类型 | 必填 | 说明 |
| --- | --- | --- | --- |
| `initialModel` | `TModel` | **是** | 表单数据的初始状态对象（普通对象即可，Hook 内部会自动转为响应式的 `ref`）。 |
| `optionsOrSchema` | [`DefineSchema[]`](#defineschema)` \| `[`UseSchemaFormOptions`](#props) | 否 | 可以直接传入 Schema 配置数组；也可以传入一个包含 `schema` 和所有其他全局 Props（如 `labelWidth`, `size`, `gridProps` 等）的配置对象。 |

### 返回值 (Returns)

| 属性/方法名 | 类型 | 说明 |
| --- | --- | --- |
| `register` | `SchemaFormRegisterProps` | **核心机制**，必须通过 `<SchemaForm v-bind="register" />` 绑定到组件上。它内部封装了 model、schema 的双向绑定以及组件实例自动挂载。 |
| `model` | `Ref<TModel>` | 响应式的表单数据对象。可以直接在 JS 中读写 `model.value`。 |
| `schema` | `Ref<`[`DefineSchema[]`](#defineschema)`>` | 响应式的 Schema 配置数组。支持动态推入或修改 Schema 项。 |
| `validate` | `(validateCallback?, shouldRuleBeApplied?) => Promise<void>` | 触发整个表单的验证。 |
| `resetFields` | `() => void` | 重置所有表单项（清空数据和校验状态）。 |
| `restoreValidation` | `() => void` | 还原表单的所有验证状态。 |
| `scrollToField` | `(field: FieldPaths<TModel>) => void` | 滚动到指定的表单项位置。 |
