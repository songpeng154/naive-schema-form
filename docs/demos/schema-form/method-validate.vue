<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const model = ref({
  username: '',
})

const { register, validate, restoreValidation, resetFields } = useSchemaForm(model, {
  labelWidth: 100,
  schema: [
    { field: 'username', label: '用户名', component: 'input', required: true },
  ],
})

async function handleValidate() {
  try {
    await validate()
    message.success('校验通过')
  } catch (errors) {
    message.error('校验失败')
  }
}

function handleRestore() {
  restoreValidation()
}

function handleReset() {
  resetFields()
}
</script>

<template>
  <SchemaForm v-bind="register" :show-actions="false" />
  <NSpace style="margin-top: 16px;">
    <NButton type="primary" @click="handleValidate">手动触发校验</NButton>
    <NButton @click="handleRestore">还原校验状态</NButton>
    <NButton type="error" ghost @click="handleReset">重置表单数据</NButton>
  </NSpace>
</template>
