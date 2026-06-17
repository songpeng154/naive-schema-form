# 自定义组件

`naive-schema-form` 底层通过极其灵活的 `SchemaComponentRegistry` 维护着所有的原生组件。这不仅让你能使用 Naive UI 的内置组件，还可以极低成本地接入你自己的业务组件。

## 1. 注册组件

你可以使用库暴露的 `registerSchemaComponent` 或 `extendSchemaComponents` 在项目启动阶段全局注册你的组件。

```ts
import { registerSchemaComponent } from 'naive-schema-form'
import BadgeInput from './components/BadgeInput.vue'

// 注册你的业务组件
registerSchemaComponent('badgeInput', {
  // 传入组件实例
  component: BadgeInput,
  
  // 设定值类型：'input' | 'select' | 'date' | 'time' | 'checked' 等。
  // 系统会根据此类型决定如何智能映射 placeholder (例如：请输入 / 请选择)
  valueType: 'input',
  
  // 是否自动将 schema 的 options 属性映射到组件上
  mapOptions: false,
  
  // 是否自动映射 placeholder
  mapPlaceholder: true,
})
```

## 2. 扩充 TypeScript 类型

为了让你的自定义组件在编写 schema 时也具备完美的代码提示，你需要进行模块类型扩展（Module Augmentation）：

```ts
// 在你的项目类型文件（如 components.d.ts 或任意 .ts 文件）中
import type { InputProps } from 'naive-ui'

declare module 'naive-schema-form' {
  // 必须扩展 SchemaCustomComponentPropsMap 接口
  interface SchemaCustomComponentPropsMap {
    // 键名为你注册时的 name
    badgeInput: {
      // 在这里定义你的组件专属 props，也可以继承现有组件属性
      prefixText?: string
      showBadge?: boolean
    }
  }
}
```

完成上述步骤后，当你在 `useSchemaForm` 中配置 `component: 'badgeInput'` 时，立刻就能获得 `prefixText` 和 `showBadge` 的代码提示。
