<script setup lang="tsx">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  phone: '',
})

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  schema: [
    {
      field: 'phone',
      label: '手机号',
      component: 'input',
      // 定义内部组件插槽（如前缀、后缀），支持直接返回 TSX
      componentSlots: {
        prefix: () => '+86',
        suffix: () => <NButton size="small" type="primary" text>获取验证码</NButton>,
      },
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
