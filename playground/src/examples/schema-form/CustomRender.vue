<script setup lang="tsx">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NCard, NSpace, NTag } from 'naive-ui'
import { ref } from 'vue'

const model = ref({
  customRender: '这是一段完全自定义渲染的内容',
  customFormItemRender: '使用自定义控件替换输入框',
})

const { register } = useSchemaForm(model, {
  labelWidth: 150,
  schema: [
    {
      field: 'customRender',
      // 使用 render 完全接管整个表单项的渲染，脱离 NFormItem
      render: (params) => {
        return (
          <NCard title="完全自定义渲染 (Render)" size="small" style="margin-bottom: 24px; background-color: #f9f9f9">
            <p style="color: #666">
              这里使用了
              {' '}
              <code>render</code>
              {' '}
              属性，完全替换了默认的 FormItem 渲染机制。
              <br />
              当前值：
              <NTag type="info">{params.model.customRender}</NTag>
            </p>
            <NButton
              type="primary"
              size="small"
              onClick={() => params.model.customRender = `完全自定义渲染被修改了！${Date.now()}`}
            >
              修改值
            </NButton>
          </NCard>
        )
      },
    },
    {
      field: 'customFormItemRender',
      label: '局部自定义渲染',
      // 使用 formItemRender 仅替换 NFormItem 内部的控件，保留 label 和校验等特性
      formItemRender: (params) => {
        return (
          <NSpace align="center">
            <NTag type="success">{params.model.customFormItemRender}</NTag>
            <NButton
              type="warning"
              size="small"
              onClick={() => params.model.customFormItemRender = '局部控件被修改了！' + Date.now()}
            >
              点击修改
            </NButton>
          </NSpace>
        )
      }
    },
    {
      field: 'stringSlot',
      slot: 'myStringSlot',
    },
    {
      field: 'stringFormItemSlot',
      label: '旧版插槽名称渲染',
      formItemSlot: 'myFormItemSlot',
    }
  ],
})
</script>

<template>
  <div style="width: 100%">
    <h2 style="margin-top: 0;">自定义渲染演示 (render / formItemRender)</h2>
    <p>演示如何通过 <code>render</code> 完全接管渲染，以及通过 <code>formItemRender</code> 局部替换组件控件。同时测试旧版字符串插槽是否正常工作。</p>

    <NCard>
      <SchemaForm v-bind="register">
        <template #myStringSlot="scope">
          <NCard title="传统作用域插槽 (slot 字符串)" size="small" style="margin-bottom: 24px; background-color: #f0f8ff">
            这是通过 <code>slot: 'myStringSlot'</code> 传递的模板。<br />
            接收到的 field: <NTag>{{ scope.field }}</NTag>
          </NCard>
        </template>

        <template #myFormItemSlot="scope">
          <NSpace align="center">
            <NTag type="info">我是 formItemSlot</NTag>
            <span>拿到字段：{{ scope.field }}</span>
          </NSpace>
        </template>
      </SchemaForm>
    </NCard>
  </div>
</template>
