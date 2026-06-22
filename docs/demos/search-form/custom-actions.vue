<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'
import { NButton } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  keyword: '',
})

const { register } = useSearchSchemaForm(model, {
  schema: [
    { field: 'keyword', label: '搜索关键字', component: 'input' },
  ],
})

function handleExport() {
  console.log('导出数据')
}
</script>

<template>
  <SearchSchemaForm v-bind="register">
    <!-- 在默认动作区之前追加内容 -->
    <template #actionsBefore>
      <NButton type="info" ghost @click="handleExport">导出明细</NButton>
    </template>
  </SearchSchemaForm>
</template>
