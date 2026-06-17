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
> `gridItemProps` 既可以直接传入一个数字（作为 `span` 的简写），也可以传入一个完整对象（如 `{ span: 4, offset: 4 }`）。
> 写法 `gridItemProps: 12` 完全等价于 `gridItemProps: { span: 12 }`。

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
