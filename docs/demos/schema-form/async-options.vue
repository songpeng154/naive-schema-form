<script setup lang="ts">
import { SchemaForm, useSchemaForm, type OptionType } from 'naive-schema-form'
import { NButton, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const model = ref({
  userRole: null,
})

const roleOptions = ref<OptionType[]>([])
const loading = ref(false)

const loadData = async () => {
  if (roleOptions.value.length > 0) return
  loading.value = true
  
  // 模拟异步请求后端接口
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  roleOptions.value = [
    { label: '超级管理员 (Admin)', value: 'admin' },
    { label: '系统运维 (DevOps)', value: 'devops' },
    { label: '普通用户 (User)', value: 'user' },
  ]
  loading.value = false
  message.success('角色字典加载完成！')
}

const { register } = useSchemaForm(model, {
  schema: [
    { 
      field: 'userRole', 
      label: '用户角色 (异步拉取)', 
      component: 'select',
      // 将 options 绑定到一个普通的 Vue Ref 上，数据拉取完成后组件会自动响应
      options: roleOptions,
      componentProps: {
        loading: loading,
        // 下拉框展开时触发请求
        onFocus: loadData
      }
    },
  ],
})
</script>

<template>
  <div>
    <div style="margin-bottom: 16px; color: #666; font-size: 13px;">
      尝试点击下方的 Select 框，它会在展开时触发接口请求获取后端字典。
    </div>
    <SchemaForm v-bind="register" />
  </div>
</template>
