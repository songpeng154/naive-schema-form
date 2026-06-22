<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'

const model = ref({
  keyword: '',
  category: null,
  status: null,
  date: null,
  creator: '',
})

const { register } = useSearchSchemaForm(model, {
  // 默认是 3，这里显式指定超过 2 个就折叠
  searchShowNumber: 2,
  enableCollapsed: true, // 默认开启
  collapsedText: '展开更多条件',
  expandedText: '收起',
  schema: [
    { field: 'keyword', label: '项目名称', component: 'input' },
    { 
      field: 'category', 
      label: '项目类别', 
      component: 'select',
      options: [{ label: '类别A', value: 'a' }, { label: '类别B', value: 'b' }]
    },
    { 
      field: 'status', 
      label: '状态', 
      component: 'select',
      options: [{ label: '启用', value: 1 }, { label: '禁用', value: 0 }]
    },
    { field: 'date', label: '创建时间', component: 'date-picker' },
    { field: 'creator', label: '创建人', component: 'input' },
  ],
})
</script>

<template>
  <SearchSchemaForm v-bind="register" />
</template>
