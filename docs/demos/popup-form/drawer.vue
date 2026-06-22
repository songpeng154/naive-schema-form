<script setup lang="ts">
import { PopupSchemaForm, usePopupSchemaForm } from 'naive-schema-form'
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  account: '',
  email: '',
})

const { register, openPopup } = usePopupSchemaForm(model, {
  type: 'drawer',
  title: '侧边栏抽屉编辑',
  width: '500px',
  confirmOnClose: true,
  resetOnClose: true,
  schema: [
    { 
      field: 'account', 
      label: '账号', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'email', 
      label: '邮箱', 
      component: 'input' 
    },
  ],
  onSubmit: async (validate) => {
    await validate()
  },
})
</script>

<template>
  <div>
    <NButton type="info" @click="openPopup()">
      打开右侧抽屉
    </NButton>
    <PopupSchemaForm v-bind="register" />
  </div>
</template>
