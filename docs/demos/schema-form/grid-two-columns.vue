<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'

const message = useMessage()

const model = ref({
  firstName: '',
  lastName: '',
  phone: '',
  email: ''
})

const { register } = useSchemaForm(model, {
  labelWidth: 80,
  gridItemProps: 12,
  showActions: true,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success('提交成功')
    } catch (e) {
      message.error('校验失败')
    }
  },
  schema: [
    {
      field: 'firstName',
      label: '名',
      component: 'input'
    },
    {
      field: 'lastName',
      label: '姓',
      component: 'input'
    },
    {
      field: 'phone',
      label: '手机',
      component: 'input'
    },
    {
      field: 'email',
      label: '邮箱',
      component: 'input'
    }
  ]
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
