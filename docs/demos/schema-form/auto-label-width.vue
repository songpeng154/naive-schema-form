<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NRadioButton, NRadioGroup } from 'naive-ui'
import { ref } from 'vue'

const isAuto = ref(true)

const model = ref({
  short: '',
  veryLooooooooooongLabel: '',
  normalLabel: '',
})

const { register } = useSchemaForm(model, {
  // autoLabelWidth 会在挂载时计算最长文本的真实 DOM 宽度，从而完美对齐
  autoLabelWidth: isAuto,
  schema: [
    { field: 'short', label: '短', component: 'input' },
    { field: 'veryLooooooooooongLabel', label: '我是一个非常非常非常非常非常非常长的标签', component: 'input' },
    { field: 'normalLabel', label: '正常长度标签', component: 'input' },
  ],
})
</script>

<template>
  <div>
    <div style="margin-bottom: 24px; padding: 16px; background: #f9fafc; border-radius: 8px;">
      自动对齐开关：
      <NRadioGroup v-model:value="isAuto">
        <NRadioButton :value="true">
          开启 autoLabelWidth
        </NRadioButton>
        <NRadioButton :value="false">
          关闭 (使用默认固定宽度)
        </NRadioButton>
      </NRadioGroup>
    </div>

    <SchemaForm v-bind="register" />
  </div>
</template>
