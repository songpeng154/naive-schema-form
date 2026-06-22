<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, NCard, useMessage } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()
const model = ref({
  field1: '',
  field2: '',
  field3: '',
  field4: '',
  field5: '',
  field6: '',
  field7: '',
  field8: '',
  field9: '',
  field10: '',
})

const { register, scrollToField, validate } = useSchemaForm(model, {
  showActions: false,
  labelWidth: 180,
  schema: [
    { 
      field: 'field1', 
      label: 'Field 1 (基本信息 - 姓名)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field2', 
      label: 'Field 2 (基本信息 - 年龄)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field3', 
      label: 'Field 3 (基本信息 - 邮箱)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field4', 
      label: 'Field 4 (职业信息 - 公司)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field5', 
      label: 'Field 5 (职业信息 - 职位)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field6', 
      label: 'Field 6 (职业信息 - 薪资)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field7', 
      label: 'Field 7 (教育信息 - 学校)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field8', 
      label: 'Field 8 (教育信息 - 学历)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field9', 
      label: 'Field 9 (教育信息 - 专业)', 
      component: 'input', 
      required: true 
    },
    { 
      field: 'field10', 
      label: 'Field 10 (其他 - 备注)', 
      component: 'input', 
      required: true, 
      componentProps: { type: 'textarea' } 
    },
  ],
})

async function handleValidate() {
  try {
    await validate()
  } catch (e) {
    message.error('校验报错，已自动滚动至错误位置')
  }
}
</script>

<template>
  <NCard bordered>
    <div style="height: 350px; overflow-y: auto; padding-right: 12px;">
      <SchemaForm v-bind="register" />
    </div>
  </NCard>
  
  <NSpace style="margin-top: 16px;">
    <NButton type="primary" @click="handleValidate">触发校验并自动滚动</NButton>
    <NButton @click="() => scrollToField('field1')">滚动到 field1 (顶部)</NButton>
    <NButton @click="() => scrollToField('field5')">滚动到 field5 (中部)</NButton>
    <NButton @click="() => scrollToField('field10')">滚动到 field10 (底部)</NButton>
  </NSpace>
</template>
