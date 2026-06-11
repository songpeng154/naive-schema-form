import { createRouter, createWebHashHistory } from 'vue-router'
import AllComponents from './views/basic/AllComponents.vue'
import DynamicLinkage from './views/basic/DynamicLinkage.vue'
import SlotsCustom from './views/basic/SlotsCustom.vue'
import FormAttributes from './views/basic/FormAttributes.vue'
import SearchForm from './views/SearchForm.vue'
import GroupForm from './views/GroupForm.vue'
import PopupForm from './views/PopupForm.vue'
import NoHookForm from './views/NoHookForm.vue'

export const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      redirect: '/forms/basic'
    },
    {
      path: '/forms/basic',
      component: AllComponents,
      name: 'form-basic',
      meta: { title: '基础表单', group: 'forms' }
    },
    {
      path: '/forms/group',
      component: GroupForm,
      name: 'form-group',
      meta: { title: '分组表单', group: 'forms' }
    },
    {
      path: '/forms/search',
      component: SearchForm,
      name: 'form-search',
      meta: { title: '查询表单', group: 'forms' }
    },
    {
      path: '/forms/popup',
      component: PopupForm,
      name: 'form-popup',
      meta: { title: '弹框表单', group: 'forms' }
    },
    {
      path: '/features/linkage',
      component: DynamicLinkage,
      name: 'feature-linkage',
      meta: { title: '动态联动', group: 'features' }
    },
    {
      path: '/features/custom',
      component: SlotsCustom,
      name: 'feature-custom',
      meta: { title: '插槽定制', group: 'features' }
    },
    {
      path: '/features/attributes',
      component: FormAttributes,
      name: 'feature-attributes',
      meta: { title: '属性配置', group: 'features' }
    },
    {
      path: '/features/no-hook',
      component: NoHookForm,
      name: 'feature-nohook',
      meta: { title: '无 Hook 写法', group: 'features' }
    }
  ]
})
