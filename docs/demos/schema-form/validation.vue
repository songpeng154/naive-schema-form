<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const model = ref({
  account: '',
  password: '',
  confirmPassword: '',
})

const { register, validate } = useSchemaForm(model, {
  labelWidth: 100,
  // 核心特性：自动开启 required 的 message 补全
  autoRequiredRule: true,
  schema: [
    {
      field: 'account',
      label: '账号',
      component: 'input',
      required: true, // 仅仅设置 true，不用写繁琐的 rules，就会自动变成 "请输入账号"
    },
    {
      field: 'password',
      label: '密码',
      component: 'input',
      componentProps: { type: 'password', showPasswordOn: 'click' },
      rules: {
        required: true,
        pattern: /^(?=.*[a-z])(?=.*\d)[\s\S]{8,16}$/i,
        message: '密码必须包含字母和数字，且长度在 8-16 之间',
        trigger: ['input', 'blur'],
      },
    },
    {
      field: 'confirmPassword',
      label: '确认密码',
      component: 'input',
      componentProps: { type: 'password', showPasswordOn: 'click' },
      required: true,
      rules: {
        validator: (rule, value) => {
          return value === model.value.password
        },
        message: '两次输入的密码不一致',
        trigger: ['input', 'blur'],
      },
    },
  ],
})

async function handleSubmit() {
  try {
    await validate()
    message.success('校验通过！')
  }
  catch (e) {
    message.error('校验失败，请检查填写内容')
  }
}
</script>

<template>
  <div>
    <SchemaForm v-bind="register" />
    <NSpace style="margin-top: 24px; padding-left: 100px;">
      <NButton type="primary" @click="handleSubmit">
        点击提交校验
      </NButton>
    </NSpace>
  </div>
</template>
