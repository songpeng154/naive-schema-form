<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'
import { NColorPicker, NTag } from 'naive-ui'

const model = ref({
  themeColor: '#18a058',
})

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  schema: [
    {
      field: 'themeColor',
      label: '主题颜色',
      // 使用 slot 自定义 FormItem 内部的输入区域
      slot: 'colorSlot',
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register">
    <!-- 通过具名插槽完美替换输入区域，同时外部的 Label 和布局都不受影响 -->
    <template #colorSlot>
      <div style="display: flex; gap: 12px; align-items: center; width: 100%;">
        <NColorPicker v-model:value="model.themeColor" style="width: 120px;" />
        <NTag :color="{ textColor: model.themeColor, borderColor: model.themeColor }">
          当前色值: {{ model.themeColor }}
        </NTag>
      </div>
    </template>
  </SchemaForm>
</template>
