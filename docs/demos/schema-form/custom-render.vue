<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NTag } from 'naive-ui'
import { h, ref } from 'vue'

const model = ref({
  phone: '',
  customColor: '#ff0000',
})

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  schema: [
    {
      field: 'phone',
      label: '手机号',
      component: 'input',
      // 定义组件插槽（如前缀、后缀）
      componentSlots: {
        prefix: () => '+86',
        suffix: () => h(NButton, { size: 'small', type: 'primary' }, { default: () => '发送验证码' }),
      },
    },
    {
      field: 'customColor',
      label: '自定义渲染',
      // 完全脱离基础组件库，使用 render 渲染复杂的自定义组件
      render: ({ model, field }) => {
        return h(
          'div',
          { style: 'display: flex; gap: 12px; align-items: center;' },
          [
            h(
              'div',
              {
                style: `width: 32px; height: 32px; border-radius: 4px; background: ${model[field]}; cursor: pointer`,
                onClick: () => model[field] = model[field] === '#ff0000' ? '#00ff00' : '#ff0000',
              },
            ),
            h(NTag, { type: 'success' }, { default: () => '点击左侧色块切换颜色' }),
          ],
        )
      },
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
