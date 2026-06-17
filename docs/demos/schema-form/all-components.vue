<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'

const message = useMessage()

const model = ref({
  input: '',
  inputNumber: null,
  select: null,
  datePicker: null,
  timePicker: null,
  switch: false,
  radioGroup: null,
  checkboxGroup: [],
  slider: 0,
  rate: 0,
  colorPicker: '#18a058'
})

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  gridItemProps: 12,
  showActions: true,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success('提交成功')
    } catch (e) {
      message.error('校验失败')
    }
  },
  schema: [
    {
      field: 'input',
      label: '输入框',
      component: 'input'
    },
    {
      field: 'inputNumber',
      label: '数字输入',
      component: 'inputNumber'
    },
    {
      field: 'select',
      label: '下拉选择',
      component: 'select',
      options: [
        { label: '选项A', value: 'a' },
        { label: '选项B', value: 'b' }
      ]
    },
    {
      field: 'datePicker',
      label: '日期选择',
      component: 'datePicker'
    },
    {
      field: 'timePicker',
      label: '时间选择',
      component: 'timePicker'
    },
    {
      field: 'switch',
      label: '开关',
      component: 'switch'
    },
    {
      field: 'radioGroup',
      label: '单选组',
      component: 'radioGroup',
      options: [
        { label: '单选A', value: 'a' },
        { label: '单选B', value: 'b' }
      ]
    },
    {
      field: 'checkboxGroup',
      label: '多选组',
      component: 'checkboxGroup',
      options: [
        { label: '多选A', value: 'a' },
        { label: '多选B', value: 'b' }
      ]
    },
    {
      field: 'slider',
      label: '滑动条',
      component: 'slider'
    },
    {
      field: 'rate',
      label: '评分',
      component: 'rate'
    },
    {
      field: 'colorPicker',
      label: '颜色选择',
      component: 'colorPicker'
    }
  ]
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
