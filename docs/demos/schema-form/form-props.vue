<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NSwitch, NRadioGroup, NRadioButton, NSpace, NFormItem } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  username: '',
  password: '',
})

const { register } = useSchemaForm(model, {
  labelWidth: 80,
  schema: [
    { field: 'username', label: '用户名', component: 'input' },
    { field: 'password', label: '密码', component: 'input', componentProps: { type: 'password' } },
  ],
})

const inline = ref(false)
const disabled = ref(true)
const size = ref<'small' | 'medium' | 'large'>('medium')
const labelPlacement = ref<'left' | 'top'>('left')
</script>

<template>
  <NSpace vertical :size="24">
    <!-- 控制面板 -->
    <div style="background: rgba(128,128,128,0.05); padding: 16px; border-radius: 8px;">
      <NSpace align="center" :size="24">
        <NFormItem label="行内模式 (inline)" label-placement="left" :show-feedback="false">
          <NSwitch v-model:value="inline" />
        </NFormItem>
        <NFormItem label="全局禁用 (disabled)" label-placement="left" :show-feedback="false">
          <NSwitch v-model:value="disabled" />
        </NFormItem>
        <NFormItem label="整体尺寸 (size)" label-placement="left" :show-feedback="false">
          <NRadioGroup v-model:value="size">
            <NRadioButton value="small">小</NRadioButton>
            <NRadioButton value="medium">中</NRadioButton>
            <NRadioButton value="large">大</NRadioButton>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="标签位置 (labelPlacement)" label-placement="left" :show-feedback="false">
          <NRadioGroup v-model:value="labelPlacement">
            <NRadioButton value="left">Left</NRadioButton>
            <NRadioButton value="top">Top</NRadioButton>
          </NRadioGroup>
        </NFormItem>
      </NSpace>
    </div>

    <!-- 表单实例 -->
    <SchemaForm 
      v-bind="register" 
      :inline="inline"
      :disabled="disabled"
      :size="size"
      :label-placement="labelPlacement"
    />
  </NSpace>
</template>
