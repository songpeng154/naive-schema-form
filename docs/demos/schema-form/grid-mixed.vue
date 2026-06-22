<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { useMessage } from 'naive-ui'

const message = useMessage()

const model = ref({
  title: '',
  author: '',
  date: null,
  category: null,
  tags: [],
  isPublished: false,
  content: ''
})

const { register } = useSchemaForm(model, {
  labelWidth: 80,
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
      field: 'title',
      label: '文章标题',
      component: 'input',
      gridItemProps: 24
    },
    {
      field: 'author',
      label: '作者',
      component: 'input',
      gridItemProps: 8
    },
    {
      field: 'date',
      label: '发布日期',
      component: 'date-picker',
      gridItemProps: 8
    },
    {
      field: 'category',
      label: '所属分类',
      component: 'select',
      options: [
        { label: '技术', value: 'tech' },
        { label: '生活', value: 'life' }
      ],
      gridItemProps: 8
    },
    {
      field: 'tags',
      label: '文章标签',
      component: 'checkbox-group',
      options: [
        { label: 'Vue', value: 'vue' },
        { label: 'React', value: 'react' },
        { label: 'Node', value: 'node' }
      ],
      gridItemProps: { span: 16 }
    },
    {
      field: 'isPublished',
      label: '直接发布',
      component: 'switch',
      gridItemProps: { span: 4, offset: 4 }
    },
    {
      field: 'content',
      label: '文章正文',
      component: 'input',
      componentProps: { type: 'textarea', rows: 3 },
      gridItemProps: 24
    }
  ]
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
