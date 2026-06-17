<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

// 1. 使用 Vue Ref 定义一个包含嵌套多级对象的数据源
const model = ref({
  account: '',
  info: {
    personal: {
      name: '',
      gender: 'male',
    },
    job: {
      title: 'developer',
      salary: null,
    },
  },
})

const { register, validate } = useSchemaForm(model, {
  showActions: true,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success('提交成功！嵌套数据已打印到控制台')
      console.log('最新的嵌套 model：', model.value)
    } catch (e) {
      message.error('校验未通过')
    }
  },
  schema: [
    {
      field: 'account',
      label: '系统账号',
      component: 'input',
      required: true,
    },
    {
      // 绑定嵌套的第二层和第三层属性：info.personal.name
      field: 'info.personal.name',
      label: '员工姓名',
      component: 'input',
      required: true,
    },
    {
      // 绑定嵌套属性：info.personal.gender
      field: 'info.personal.gender',
      label: '员工性别',
      component: 'radioGroup',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
    {
      // 绑定嵌套属性：info.job.title
      field: 'info.job.title',
      label: '工作岗位',
      component: 'select',
      options: [
        { label: '开发工程师', value: 'developer' },
        { label: '产品经理', value: 'pm' },
        { label: '设计师', value: 'designer' },
      ],
    },
  ],
})
</script>

<template>
  <div class="demo-nested-wrapper">
    <SchemaForm v-bind="register" />
  </div>
</template>
