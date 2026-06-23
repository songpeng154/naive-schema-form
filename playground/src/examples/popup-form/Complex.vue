<script setup lang="tsx">
import { PopupSchemaForm, usePopupSchemaForm } from 'naive-schema-form'
import { NButton, NCard, NSpace } from 'naive-ui'
import { ref } from 'vue'

const form = ref<any>({
  name: '',
  type: 1, // PermissionType.DIRECTORY
  parentId: undefined,
  path: undefined,
  pathParams: undefined,
  permission: undefined,
  icon: undefined,
  affixTab: false,
  ignoreAuth: false,
  keepAlive: false,
  iframeSrc: undefined,
  customizeIframeComponent: false,
  hideMenu: false,
  disabledMenu: false,
  sortNum: 0,
})

const { register, toggle } = usePopupSchemaForm(form, {
  schema: [
    {
      field: 'type',
      label: '类型',
      component: 'select',
      options: [
        { label: '目录', value: 1 },
        { label: '菜单', value: 2 },
        { label: '按钮', value: 3 },
      ],
    },
    {
      field: 'name',
      label: '名称',
      component: 'input',
      required: true,
    },
    {
      field: 'parentId',
      label: '父级菜单',
      component: 'tree-select',
      componentProps: {
        labelField: 'name',
        keyField: 'id',
        childrenField: 'children',
      },
      options: [],
    },
    {
      field: 'sortNum',
      label: '排序',
      component: 'input-number',
    },
    {
      field: 'path',
      label: '路由地址 | 外链地址',
      component: 'input',
      tooltip: '目录可配置路由地址；菜单可同时配置路由地址和外链地址',
      placeholder: '例如：/system/user',
      hide: params => params.model.type === 3,
    },
    {
      field: 'pathParams',
      label: '路由参数',
      component: 'input',
      hide: params => params.model.type !== 2,
    },
    {
      field: 'permission',
      label: '权限标识',
      component: 'input',
      hide: params => params.model.type !== 3,
    },
    {
      field: 'iframeSrc',
      label: '内嵌地址',
      component: 'input',
      hide: params => params.model.type !== 2,
    },
    {
      field: 'hideMenu',
      label: '隐藏菜单',
      component: 'switch',
      hide: params => params.model.type === 3,
      gridItemProps: 12,
    },
    {
      field: 'disabledMenu',
      label: '禁用菜单',
      component: 'switch',
      gridItemProps: 12,
    },
    {
      field: 'keepAlive',
      label: '缓存菜单',
      component: 'switch',
      hide: params => params.model.type !== 2,
    },
    {
      field: 'affixTab',
      label: '固定标签栏',
      component: 'switch',
      hide: params => params.model.type !== 2,
    },
    {
      field: 'ignoreAuth',
      label: '忽略权限',
      component: 'switch',
      hide: params => params.model.type !== 2,
    },
    {
      field: 'customizeIframeComponent',
      label: '自定义内嵌组件',
      component: 'switch',
      hide: params => params.model.type !== 2 || !params.model.iframeSrc,
    },
  ],
  onSubmit: async () => {
    console.log('Submitted', form.value)
  },
})
</script>

<template>
  <div class="flex flex-col gap-1 h-full">
    <NCard class="flex-1" content-class="flex flex-col">
      <NSpace class="mb-10px">
        <NButton type="primary" @click="toggle()">
          打开弹窗表单测试
        </NButton>
      </NSpace>
    </NCard>
    <PopupSchemaForm v-bind="register" />
  </div>
</template>
