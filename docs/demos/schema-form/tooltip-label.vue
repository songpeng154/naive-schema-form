<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { ref, h } from 'vue'

const model = ref({
  account: '',
  version: '',
})

const { register } = useSchemaForm(model, {
  labelWidth: 120,
  schema: [
    { 
      field: 'account', 
      label: '云服务账号', 
      component: 'input',
      // 最简单的用法：直接传入字符串，会自动在 Label 右侧生成一个小问号图标
      tooltip: '请输入您的云服务通行证，如果忘记请联系管理员。',
      required: true 
    },
    { 
      field: 'version', 
      // 进阶用法：传入函数动态返回 VNode（如 TSX 或 h 函数），实现极其个性的 Label
      label: () => h('span', { style: 'color: #18a058; font-weight: bold;' }, '🚀 部署版本'), 
      component: 'select',
      options: [
        { label: 'v1.0.0 (稳定版)', value: '1.0.0' },
        { label: 'v2.0.0-beta (尝鲜版)', value: '2.0.0' }
      ]
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
