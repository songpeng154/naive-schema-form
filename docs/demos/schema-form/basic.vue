<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'

const message = useMessage()

const model = ref({
  name: '',
  age: null
})

const { register } = useSchemaForm(model, {
  labelWidth: 80,
  showActions: true,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success('提交成功！姓名：' + (model.value.name || '空'))
    } catch (e) {
      message.error('校验失败')
    }
  },
  schema: [
    {
      field: 'name',
      label: '姓名',
      component: 'input',
      required: true
    },
    {
      field: 'age',
      label: '年龄',
      component: 'inputNumber'
    }
  ]
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
