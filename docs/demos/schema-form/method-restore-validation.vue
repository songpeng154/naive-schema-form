<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  username: '',
})

const { register, validate, restoreValidation } = useSchemaForm(model, {
  showActions: false,
  labelWidth: 100,
  schema: [
    { 
      field: 'username', 
      label: '用户名', 
      component: 'input', 
      required: true 
    },
  ],
})

function handleValidate() {
  validate().catch(() => {})
}

function handleRestore() {
  restoreValidation()
}
</script>

<template>
  <SchemaForm v-bind="register" />
  
  <NSpace style="margin-top: 16px;">
    <NButton type="primary" @click="handleValidate">触发校验</NButton>
    <NButton @click="handleRestore">还原校验状态</NButton>
  </NSpace>
</template>
