<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const model = ref({
  projectName: '',
  budget: null,
})

const { register } = useSchemaForm(model, {
  labelWidth: 80,
  schema: [
    { 
      field: 'projectName', 
      label: '项目名称', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'budget', 
      label: '预算金额', 
      component: 'inputNumber', 
      required: true 
    },
  ],
})

// 点击提交按钮时（在执行校验之前拦截）
const handleSubmit = () => {
  message.info('1. [onSubmit] 拦截到了提交动作，正在准备校验...')
}

// 只有当所有字段校验通过后才会触发
const handleFinish = (data: Record<string, any>) => {
  message.success(`2. [onFinish] 校验通过！准备发请求，数据：${JSON.stringify(data)}`)
}

// 如果校验失败，会触发此事件（而不是触发 finish）
const handleFinishFailed = (errors: any) => {
  message.error('2. [onFinishFailed] 校验失败，请检查红框字段！')
  console.log('校验报错信息:', errors)
}

// 点击重置按钮时触发
const handleReset = () => {
  message.warning('3. [onReset] 拦截到了重置动作！')
}
</script>

<template>
  <SchemaForm 
    v-bind="register" 
    @submit="handleSubmit"
    @finish="handleFinish"
    @finish-failed="handleFinishFailed"
    @reset="handleReset"
  />
</template>
