<script setup lang="ts">
import type { SchemaFormExpose } from '../../../../src'
import { ref } from 'vue'
import { SchemaForm } from '../../../../src'
import { message } from '../message'
import { validationModel, validationRules, validationSchema } from '../validation'

const formRef = ref<SchemaFormExpose>()

function handleFinish() {
  message.success('校验表单通过')
  console.log('校验表单', validationModel)
}

function validate() {
  formRef.value
    ?.validate()
    .then(() => message.success('校验表单通过'))
    .catch(() => message.error('校验失败，已滚动到第一个错误项'))
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    覆盖 autoRequiredRule、rules 预设、Naive UI rules、自定义 validator、restoreValidation 与 reset。
  </n-alert>
  <n-space class="tab-toolbar">
    <n-button type="primary" @click="validate">
      手动校验
    </n-button>
    <n-button @click="formRef?.restoreValidation()">
      清空校验状态
    </n-button>
    <n-button @click="formRef?.resetFields()">
      重置字段
    </n-button>
  </n-space>
  <SchemaForm
    ref="formRef"
    v-model:model="validationModel"
    :schema="validationSchema"
    label-placement="left"
    label-align="right"
    :rules="validationRules"
    :grid-props="{ cols: 24, xGap: 16, yGap: 12 }"
    @finish="handleFinish"
  />
</template>
