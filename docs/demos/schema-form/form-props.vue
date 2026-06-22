<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NSwitch, NRadioGroup, NRadioButton, NSpace, NFormItem } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  username: '',
  password: '',
  city: null,
})

const disabled = ref(false)
const showLabel = ref(true)
const showFeedback = ref(true)
const size = ref<'small' | 'medium' | 'large'>('medium')
const labelPlacement = ref<'left' | 'top'>('left')
const labelAlign = ref<'left' | 'right'>('right')
const requireMarkPlacement = ref<'left' | 'right' | 'right-hanging'>('right')

const { register } = useSchemaForm(model, {
  labelWidth: 80,
  schema: [
    { 
      field: 'username', 
      label: '用户名', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'password', 
      label: '密码', 
      component: 'input', 
      componentProps: { type: 'password' } 
    },
    { 
      field: 'city', 
      label: '城市', 
      component: 'select', 
      options: [
        { label: '北京', value: 'bj' }, 
        { label: '上海', value: 'sh' }
      ] 
    },
  ],
  disabled,
  showLabel,
  showFeedback,
  size,
  labelPlacement,
  labelAlign,
  requireMarkPlacement,
})
</script>

<template>
  <NSpace vertical :size="24">
    <!-- 控制面板 -->
    <div style="background: rgba(128,128,128,0.05); padding: 16px; border-radius: 8px;">
      <NSpace align="center" :size="24" wrap>
        <NFormItem label="全局禁用 (disabled)" label-placement="left" :show-feedback="false">
          <NSwitch v-model:value="disabled" />
        </NFormItem>
        <NFormItem label="显示标签 (showLabel)" label-placement="left" :show-feedback="false">
          <NSwitch v-model:value="showLabel" />
        </NFormItem>
        <NFormItem label="显示反馈区 (showFeedback)" label-placement="left" :show-feedback="false">
          <NSwitch v-model:value="showFeedback" />
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
        <NFormItem label="标签对齐 (labelAlign)" label-placement="left" :show-feedback="false">
          <NRadioGroup v-model:value="labelAlign">
            <NRadioButton value="left">左对齐</NRadioButton>
            <NRadioButton value="right">右对齐</NRadioButton>
          </NRadioGroup>
        </NFormItem>
        <NFormItem label="星号位置 (requireMarkPlacement)" label-placement="left" :show-feedback="false">
          <NRadioGroup v-model:value="requireMarkPlacement">
            <NRadioButton value="left">Left</NRadioButton>
            <NRadioButton value="right">Right</NRadioButton>
            <NRadioButton value="right-hanging">Hanging</NRadioButton>
          </NRadioGroup>
        </NFormItem>
      </NSpace>
    </div>

    <SchemaForm v-bind="register" />
  </NSpace>
</template>
