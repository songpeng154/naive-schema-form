import { createRouter, createWebHashHistory } from 'vue-router'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/schema-form/base',
    },
    // SchemaForm
    {
      path: '/schema-form/base',
      name: 'SchemaForm-Base',
      component: () => import('./examples/schema-form/Base.vue'),
      meta: { title: '基础渲染', group: 'SchemaForm' },
    },
    {
      path: '/schema-form/layout-grid',
      name: 'SchemaForm-LayoutGrid',
      component: () => import('./examples/schema-form/LayoutAndGrid.vue'),
      meta: { title: '排版与栅格', group: 'SchemaForm' },
    },
    {
      path: '/schema-form/validation',
      name: 'SchemaForm-Validation',
      component: () => import('./examples/schema-form/Validation.vue'),
      meta: { title: '多维校验组合', group: 'SchemaForm' },
    },
    // GroupSchemaForm
    {
      path: '/group-form/base',
      name: 'GroupForm-Base',
      component: () => import('./examples/group-form/Base.vue'),
      meta: { title: '分组表单基础用法', group: 'GroupSchemaForm' },
    },
    // SearchSchemaForm
    {
      path: '/search-form/base',
      name: 'SearchForm-Base',
      component: () => import('./examples/search-form/Base.vue'),
      meta: { title: '查询表单基础与折叠', group: 'SearchSchemaForm' },
    },
    // PopupSchemaForm
    {
      path: '/popup-form/base',
      name: 'PopupForm-Base',
      component: () => import('./examples/popup-form/Base.vue'),
      meta: { title: '弹窗表单确认机制', group: 'PopupSchemaForm' },
    },
    {
      path: '/popup-form/complex',
      name: 'PopupForm-Complex',
      component: () => import('./examples/popup-form/Complex.vue'),
      meta: { title: '复杂弹窗表单', group: 'PopupSchemaForm' },
    },
    // You can add more routes here later as we build them out
  ],
})
