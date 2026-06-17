<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NAlert, NButton } from 'naive-ui'
import { ref } from 'vue'

// 构造一个超长的表单数据
const model = ref(
  Array.from({ length: 20 }).reduce((acc, _, index) => {
    acc[`field${index}`] = ''
    return acc
  }, {} as Record<string, string>),
)

// 构造 20 个 Schema 项
const schema = Array.from({ length: 20 }).map((_, index) => ({
  field: `field${index}`,
  label: `必填字段 ${index + 1}`,
  component: 'input',
  required: true, // 所有项全部必填
}))

const { register, validate } = useSchemaForm(model, {
  labelWidth: 100,
  // 核心痛点解决：自动滚动到第一个报错字段！
  scrollToFirstError: true,
  schema: schema as any,
})

function submit() {
  validate().catch(() => {})
}
</script>

<template>
  <div>
    <NAlert type="warning" style="margin-bottom: 16px;">
      <strong>请勿填写任何内容</strong>，直接滚动到最底部点击提交按钮，观察页面的平滑滚动拦截效果。
    </NAlert>
    <div style="height: 350px; overflow-y: auto; padding: 24px; border: 1px solid #efeff5; border-radius: 8px;">
      <SchemaForm v-bind="register" />
      <div style="margin-top: 24px;">
        <NButton type="error" block @click="submit">
          一键提交
        </NButton>
      </div>
    </div>
  </div>
</template>
