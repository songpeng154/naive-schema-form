<script setup lang="ts">
import { GroupSchemaForm, useGroupSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'

const model = ref({
  siteName: '我的网站',
  domain: 'example.com',
  enableCache: true,
  cacheTime: 3600,
})

const { register } = useGroupSchemaForm(model, {
  schema: [
    {
      title: '基础信息',
      helpMessage: '网站的基本资料',
      form: [
        { field: 'siteName', label: '网站名称', component: 'input' },
        { field: 'domain', label: '绑定域名', component: 'input' },
      ],
    },
    {
      title: '高级设置',
      collapsed: true,
      form: [
        { field: 'enableCache', label: '开启缓存', component: 'switch' },
        {
          field: 'cacheTime',
          label: '缓存时间(秒)',
          component: 'inputNumber',
          hide: ({ model }) => !model.enableCache,
        },
      ],
    },
  ],
})
</script>

<template>
  <GroupSchemaForm v-bind="register" />
</template>
