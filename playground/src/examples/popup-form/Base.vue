<script setup lang="ts">
import { PopupSchemaForm, usePopupSchemaForm } from 'naive-schema-form'
import { NButton, NCard, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const model = ref({
  username: '',
  email: '',
})

const { register, open, close } = usePopupSchemaForm(model, {
  title: '编辑用户信息 (修改后关闭会二次确认)',
  type: 'modal',
  confirmOnClose: true, // 核心属性：数据修改后关闭弹窗前确认
  schema: [
    {
      field: 'username',
      label: '用户名',
      component: 'input',
      required: true,
      componentProps: { placeholder: '请输入用户名' },
    },
    {
      field: 'email',
      label: '邮箱',
      component: 'input',
      rules: 'mail',
      componentProps: { placeholder: '请输入邮箱' },
    },
  ],
  onSubmit: async (validate) => {
    try {
      await validate()
      message.success(`保存成功: ${JSON.stringify(model.value)}`)
      close()
    }
    catch (e) {
      message.error('校验失败，请检查表单')
    }
  },
})

function handleOpen() {
  open()
}
</script>

<template>
  <div style="width: 100%">
    <h2 style="margin-top: 0;">
      弹窗表单 (PopupSchemaForm)
    </h2>
    <p>点击下方按钮打开弹窗。尝试修改表单内容，然后点击关闭按钮或遮罩层，观察是否触发二次确认提示。</p>

    <NCard>
      <NSpace>
        <NButton type="primary" @click="handleOpen">
          打开带确认机制的弹窗
        </NButton>
      </NSpace>
    </NCard>

    <PopupSchemaForm v-bind="register" />
  </div>
</template>
