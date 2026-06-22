<script setup lang="ts">
import { useSchemaForm } from 'naive-schema-form'
import { NButton, NInput, NSpace } from 'naive-ui'

const { register, model } = useSchemaForm({
  customValue: '',
}, [
  {
    field: 'customValue',
    label: '自定义双向绑定组件',
    slot: 'myCustomComponent',
    required: true,
    tooltip: '该字段通过 slot 结合原生 v-model 实现了双向绑定。',
  },
])
</script>

<template>
  <div>
    <SchemaForm v-bind="register" :show-actions="false">
      <!-- 
        使用插槽实现自定义组件的双向绑定，
        可以在 scope 中解构出当前 model 对象和相应的 field
      -->
      <template #myCustomComponent="{ model, field }">
        <NSpace align="center">
          <NInput v-model:value="model[field]" placeholder="在自定义插槽中修改数据..." />
          <NButton @click="model[field] = '通过外部按钮设置的值'">自动赋值</NButton>
        </NSpace>
      </template>
    </SchemaForm>
    <div style="margin-top: 16px; padding: 12px; background: #f5f5f5; border-radius: 4px;">
      <strong>当前绑定的值：</strong> {{ model.customValue || '空' }}
    </div>
  </div>
</template>
