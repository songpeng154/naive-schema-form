<script setup lang="ts">
import { SearchSchemaForm, useSearchSchemaForm } from 'naive-schema-form'
import { NCard, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

const model = ref({
  keyword: '',
  status: null,
  dateRange: null,
  creator: '',
  category: null,
})

const { register } = useSearchSchemaForm(model, {
  enableCollapsed: true,
  searchShowNumber: 3,
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success(`查询成功，参数: ${JSON.stringify(model.value)}`)
    }
    catch (e) {
      message.error('校验未通过')
    }
  },
  onReset: () => {
    message.info('重置查询条件')
  },
  schema: [
    {
      field: 'keyword',
      label: '项目名称',
      component: 'input',
      componentProps: { placeholder: '请输入关键字' },
    },
    {
      field: 'status',
      label: '状态',
      component: 'select',
      options: [
        { label: '进行中', value: 1 },
        { label: '已完成', value: 2 },
      ],
      componentProps: { placeholder: '请选择状态' },
    },
    {
      field: 'dateRange',
      label: '创建时间',
      component: 'datePicker',
      componentProps: { type: 'daterange', clearable: true },
    },
    {
      field: 'creator',
      label: '创建人',
      component: 'input',
      componentProps: { placeholder: '请输入创建人姓名' },
    },
    {
      field: 'category',
      label: '类别',
      component: 'select',
      options: [
        { label: '内部项目', value: 'inner' },
        { label: '外部项目', value: 'outer' },
      ],
      componentProps: { placeholder: '请选择类别' },
    },
  ],
})
</script>

<template>
  <div style="width: 100%">
    <h2 style="margin-top: 0;">
      查询表单 (SearchSchemaForm)
    </h2>
    <p>调整浏览器窗口大小，可以观察操作区域和表单项的动态对齐效果。点击"展开"查看折叠项。</p>

    <NCard content-style="width:100%">
      <SearchSchemaForm v-bind="register" />
    </NCard>
  </div>
</template>
