<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'
import { NAlert } from 'naive-ui'

const model = ref({
  username: '',
  password: ''
})

const { register } = useSchemaForm(model, {
  labelWidth: 100,
  schema: [
    {
      field: 'username',
      label: '账号',
      component: 'input',
    },
    {
      // 纯 UI 占位，不需要绑定 field
      formItemSlot: 'alertBlock',
      // 设置占据整行
      gridItemProps: 24
    },
    {
      field: 'password',
      label: '密码',
      component: 'input',
      componentProps: { type: 'password', showPasswordOn: 'click' }
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register">
    <!-- formItemSlot 完全脱离 Label 和验证机制 -->
    <template #alertBlock>
      <NAlert title="安全提示" type="warning" style="margin-bottom: 24px;">
        密码请尽量包含大小写字母以及特殊符号，以保证账号安全。这段内容使用 formItemSlot 插入，它完全替代了原有的 NFormItem 结构。
      </NAlert>
    </template>
  </SchemaForm>
</template>
