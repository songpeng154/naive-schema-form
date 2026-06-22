<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'

const model = ref({
  keyword: '',
  status: null,
})

const { register } = useSearchSchemaForm(model, {
  // 覆盖默认的栅格参数，强制所有列占据 12 栅格（即一行两列）
  gridItemProps: {
    span: 12
  },
  // 可以控制间距
  gridProps: {
    cols: 24,
    xGap: 24,
  },
  schema: [
    { field: 'keyword', label: '关键字', component: 'input' },
    { field: 'status', label: '状态', component: 'select', options: [] },
  ],
})
</script>

<template>
  <SearchSchemaForm v-bind="register" />
</template>
