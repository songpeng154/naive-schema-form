<script setup lang="ts">
import type { SchemaFormExpose } from '../../../../src'
import { ref } from 'vue'
import { SchemaForm } from '../../../../src'
import { baseModel, baseSchema, validationRules } from '../base'
import { message } from '../message'

const formRef = ref<SchemaFormExpose>()

defineExpose({
  validate,
  scrollToEmail,
  addRuntimeKey,
})

function handleFinish() {
  message.success('基础表单校验通过')
  console.log('基础表单', baseModel)
}

function addRuntimeKey() {
  ;(baseModel as any).runtimeOnly = `runtime-${Date.now()}`
  message.info('已写入 runtimeOnly，点重置可测试清理')
}

function scrollToEmail() {
  formRef.value?.scrollToField('email')
  message.info('已调用 scrollToField("email")')
}

function validate() {
  formRef.value
    ?.validate()
    .then(() => message.success('基础表单校验通过'))
    .catch(() => message.error('校验失败，已滚动到第一个错误项'))
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    覆盖常用组件、校验、插槽、自定义注册组件、错误组件提示和 scrollToFirstError。
  </n-alert>
  <SchemaForm
    ref="formRef"
    v-model:model="baseModel"
    :schema="baseSchema"
    label-placement="left"
    label-align="right"
    :rules="validationRules"
    :grid-props="{ cols: 24, xGap: 16, yGap: 10 }"
    :scroll-to-first-error="true"
    @finish="handleFinish"
  >
    <template #actionsBefore>
      <n-button tertiary @click="message.info('actionsBefore slot')">
        前置按钮
      </n-button>
    </template>
    <template #actionsAfter>
      <n-button tertiary type="warning" @click="formRef?.restoreValidation()">
        清空校验
      </n-button>
    </template>
    <template #wholeItem>
      <div class="slot-card">
        <strong>itemSlot</strong>
        <span>替换整个 GridItem 内容，适合提示块、分割内容或复杂自定义 UI。</span>
      </div>
    </template>
    <template #rolePreview>
      <n-alert type="info" :bordered="false">
        当前角色：{{ baseModel.role || '未选择' }}
      </n-alert>
    </template>
  </SchemaForm>
</template>
