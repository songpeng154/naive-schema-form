# 快速上手

## 安装依赖

使用你的包管理器安装 `naive-schema-form` 及其必须的对等依赖 `naive-ui` 和 `vue`：

```bash
pnpm add naive-schema-form naive-ui vue
```

## 全局引入样式

在你的入口文件（例如 `main.ts` 或 `App.vue`）中，引入必要的 CSS 样式文件。

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'

import 'naive-schema-form/style.css'

const app = createApp(App)
app.mount('#app')
```

## 第一个表单

`naive-schema-form` 推荐采用 `useSchemaForm` Hook 的方式来控制表单配置和数据流。

<demo src="../demos/schema-form/basic.vue" title="基础示例" description="这是最基础的 Schema Form 示例，涵盖了原生的各类输入组件映射。" />
