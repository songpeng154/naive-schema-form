<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const model = ref({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
})

const { register, validate, resetFields, restoreValidation, scrollToField } = useSchemaForm(model, {
  showActions: false,
  labelWidth: 100,
  // SchemaForm 默认 scrollToFirstError: true
  schema: [
    { 
      field: 'field1', 
      label: '必填项 1', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field2', 
      label: '必填项 2', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'placeholder', 
      label: '超长占位区', 
      component: 'input', 
      formItemSlot: 'space', 
      gridItemProps: 24 
    },
    { 
      field: 'field3', 
      label: '必填项 3', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field4', 
      label: '必填项 4', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field5', 
      label: '必填项 5', 
      component: 'input', 
      required: true 
    },
  ],
})

async function handleValidate() {
  try {
    // 触发全局校验，如果报错会自动滚动到第一个报错字段
    await validate()
    message.success('校验完美通过！')
  } catch (errors) {
    message.error('校验失败，已自动滚动至错误位置')
  }
}

function handleClear() {
  restoreValidation()
  message.success('校验红字状态已清除')
}

function handleReset() {
  resetFields()
  message.success('已清空数据和校验状态')
}

function handleScrollTo() {
  scrollToField('field5')
}
</script>

<template>
  <!-- 外部套一个定高容器并开启滚动，方便演示自动定位功能 -->
  <div style="height: 350px; overflow-y: auto; padding: 4px; border: 1px solid rgba(128,128,128,0.2); border-radius: 8px;">
    <SchemaForm v-bind="register">
      <!-- 利用自定义表单项造一个超长的空白墙 -->
      <template #space>
        <div style="height: 600px; background: rgba(128,128,128,0.05); border-radius: 8px; display: flex; align-items: center; justify-content: center; color: #999;">
          这里是超长的滚动占位区...
        </div>
      </template>
    </SchemaForm>
  </div>
  
  <NSpace style="margin-top: 16px;">
    <NButton type="primary" @click="handleValidate">手动校验全部</NButton>
    <NButton type="warning" @click="handleClear">还原校验状态</NButton>
    <NButton type="error" ghost @click="handleReset">彻底重置表单</NButton>
    <NButton type="info" @click="handleScrollTo">手动滑到第五项</NButton>
  </NSpace>
</template>
