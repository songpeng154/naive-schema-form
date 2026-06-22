<script setup lang="ts">
import { useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, NStep, NSteps } from 'naive-ui'
import { ref } from 'vue'

const currentStep = ref<number>(1)

const { register, model, validate } = useSchemaForm({
  name: '',
  email: '',
  password: '',
  address: '',
}, [
  {
    field: 'name',
    label: '姓名',
    component: 'input',
    required: true,
    hide: () => currentStep.value !== 1,
  },
  {
    field: 'email',
    label: '邮箱',
    component: 'input',
    rules: 'mail',
    hide: () => currentStep.value !== 1,
  },
  {
    field: 'password',
    label: '密码',
    component: 'input',
    componentProps: {
      type: 'password',
      showPasswordOn: 'click',
    },
    required: true,
    hide: () => currentStep.value !== 2,
  },
  {
    field: 'address',
    label: '收货地址',
    component: 'input',
    required: true,
    hide: () => currentStep.value !== 2,
  },
])

function handleNext() {
  validate().then(() => {
    currentStep.value++
  }).catch(() => {})
}

function handlePrev() {
  currentStep.value--
}

function handleSubmit() {
  validate().then(() => {
    console.log('提交的数据：', model.value)
  }).catch(() => {})
}
</script>

<template>
  <div style="max-width: 600px; margin: 0 auto">
    <NSteps :current="currentStep" style="margin-bottom: 24px">
      <NStep title="基本信息" description="填写您的个人基本信息" />
      <NStep title="安全与收货" description="设置密码并填写收货地址" />
    </NSteps>

    <SchemaForm v-bind="register" :show-actions="false" />

    <NSpace justify="end" style="margin-top: 24px">
      <NButton v-if="currentStep > 1" @click="handlePrev">
        上一步
      </NButton>
      <NButton v-if="currentStep < 2" type="primary" @click="handleNext">
        下一步
      </NButton>
      <NButton v-if="currentStep === 2" type="primary" @click="handleSubmit">
        提交
      </NButton>
    </NSpace>
  </div>
</template>
