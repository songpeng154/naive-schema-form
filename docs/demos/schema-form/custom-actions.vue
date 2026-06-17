<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'
import { NButton, useMessage } from 'naive-ui'

const message = useMessage()
const model = ref({
  title: '',
})

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  schema: [
    {
      field: 'title',
      label: '文章标题',
      component: 'input',
    },
  ],
})

function handleSaveDraft() {
  message.info('草稿已保存！')
}
</script>

<template>
  <SchemaForm v-bind="register">
    <!-- 在默认按钮前插入 -->
    <template #actionsBefore>
      <NButton type="warning" ghost style="margin-right: 12px;" @click="handleSaveDraft">
        保存草稿
      </NButton>
    </template>
    
    <!-- 在默认按钮后插入 -->
    <template #actionsAfter>
      <NButton text style="margin-left: 12px;">返回列表</NButton>
    </template>
  </SchemaForm>
</template>
