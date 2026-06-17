<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'

const model = ref({
  keyword: '',
  status: null,
  date: null,
})

const { register } = useSearchSchemaForm(model, {
  searchShowNumber: 2,
  enableCollapsed: true,
  schema: [
    {
      field: 'keyword',
      label: '关键字',
      component: 'input',
    },
    {
      field: 'status',
      label: '状态',
      component: 'select',
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
    {
      field: 'date',
      label: '创建时间',
      component: 'datePicker',
    },
  ],
  onSubmit: async (validate, currentModel) => {
    await validate()
    console.log('搜索参数：', currentModel)
  },
})
</script>

<template>
  <SearchSchemaForm v-bind="register" />
</template>
