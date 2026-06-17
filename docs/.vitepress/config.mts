import { defineConfig } from 'vitepress'
import { demoMdPlugin } from 'vitepress-plugin-demo'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'naive-schema-form',
  description: 'Schema-driven form components for Vue 3 + Naive UI',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '指南', link: '/guide/' },
      { text: '组件', link: '/components/schema-form' },
    ],

    sidebar: [
      {
        text: '指南',
        items: [
          { text: '简介', link: '/guide/' },
          { text: '快速开始', link: '/guide/getting-started' },
          { text: '自定义组件', link: '/guide/custom-components' },
          { text: '栅格布局', link: '/guide/grid' },
          { text: '全局配置', link: '/guide/global-config' },
        ],
      },
      {
        text: '组件',
        items: [
          { text: '基础表单 SchemaForm', link: '/components/schema-form' },
          { text: '查询表单 SearchSchemaForm', link: '/components/search-schema-form' },
          { text: '弹窗表单 PopupSchemaForm', link: '/components/popup-schema-form' },
          { text: '分组表单 GroupSchemaForm', link: '/components/group-schema-form' },
        ],
      },
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/songpeng154/naive-schema-form' },
    ],
  },
  markdown: {
    config(md) {
      md.use(demoMdPlugin)
    },
  },
})
