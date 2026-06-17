<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'

const message = useMessage()

const model = ref({
  searchKey: ''
})

const { register } = useSchemaForm(model, {
  showLabel: false, // 全局隐藏 Label
  showActions: true,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success('搜索：' + (model.value.searchKey || '空'))
    } catch (e) {
      message.error('校验失败')
    }
  },
  schema: [
    {
      field: 'searchKey',
      label: '搜索关键词',
      component: 'input',
      componentProps: { placeholder: '无需标签，直接输入关键词...' }
    }
  ]
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
