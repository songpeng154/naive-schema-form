<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'

const model = ref({
  firstName: '',
  lastName: '',
  address: '',
})

const { register } = useSchemaForm(model, {
  gridProps: { cols: 24, xGap: 16 },
  schema: [
    {
      field: 'firstName',
      label: '名字',
      component: 'input',
      gridItemProps: { span: 12 },
    },
    {
      field: 'lastName',
      label: '姓氏',
      component: 'input',
      gridItemProps: { span: 12 },
    },
    {
      field: 'address',
      label: '详细地址',
      component: 'input',
      componentProps: { type: 'textarea' },
      gridItemProps: { span: 24 },
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
