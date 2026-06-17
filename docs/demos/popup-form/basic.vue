<script setup lang="ts">
import { PopupSchemaForm, usePopupSchemaForm } from 'naive-schema-form'
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  account: '',
  email: '',
})

const { register, openPopup } = usePopupSchemaForm(model, {
  title: '新建用户',
  width: '400px',
  confirmOnClose: true,
  resetOnClose: true,
  schema: [
    { field: 'account', label: '账号', component: 'input', required: true },
    { field: 'email', label: '邮箱', component: 'input' },
  ],
  onSubmit: async (validate) => {
    await validate()
    // 提交成功，返回不报错则自动关闭弹窗
  },
})
</script>

<template>
  <div>
    <NButton type="primary" @click="openPopup()">
      打开弹窗表单
    </NButton>
    <PopupSchemaForm v-bind="register" />
  </div>
</template>
