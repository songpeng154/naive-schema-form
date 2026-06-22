<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const model = ref({
  username: '',
  email: '',
})

// 模拟向后端发起的查重请求
function checkUsernameExist(username: string): Promise<boolean> {
  return new Promise((resolve) => {
    setTimeout(() => {
      // 假设数据库中已经存在 admin 和 root
      resolve(['admin', 'root'].includes(username.toLowerCase()))
    }, 1000)
  })
}

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success('注册成功！')
    } catch (e) {
      message.error('校验未通过')
    }
  },
  schema: [
    {
      field: 'username',
      label: '用户名',
      component: 'input',
      required: true,
      componentProps: {
        placeholder: '试试输入 admin 或 root 触发查重报错',
      },
      rules: {
        trigger: 'blur', // 失去焦点时触发请求
        validator: async (rule, value) => {
          if (!value) return true
          // 此处可以自行加上 loading 状态逻辑（Naive UI 原生暂不支持表单项级别的 loading 动画，可配合外部插槽实现）
          const isExist = await checkUsernameExist(value)
          if (isExist) {
            return Promise.reject(new Error('该用户名已被注册，请更换一个'))
          }
          return Promise.resolve()
        },
      },
    },
    {
      field: 'email',
      label: '邮箱',
      component: 'input',
      required: true,
      rules: 'mail',
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
