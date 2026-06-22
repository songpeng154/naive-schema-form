<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, useMessage } from 'naive-ui'
import { computed, ref } from 'vue'

const message = useMessage()

// 1. 使用 Vue Ref 定义表单数据源
const model = ref({
  userType: 'personal',
  companyName: '',
  hasExperience: false,
  role: 'developer',
  dynamicRequiredField: '',
  systemRole: null,
  reason: '',
  adminSecret: '',
})

// 2. 外部的 Vue Ref 和 Computed 也可以直接参与 schema 动态配置
const isWorkDay = ref(true)
const dynamicLabelSuffix = computed(() => isWorkDay.value ? ' (工作日处理)' : ' (非工作日延迟)')

const { register } = useSchemaForm(model, {
  showActions: true,
  onSubmit: async (validate) => {

    try {
      await validate()
      message.success('提交成功！数据已打印在控制台')
      console.log('表单数据：', model.value)
    } catch (e) {
      message.error('校验未通过，请检查填写项')
    }
  },
  onReset: () => {
    message.info('表单已重置')
  },
  schema: [
    {
      field: 'userType',
      label: '主体类型',
      component: 'radioGroup',
      options: [
        { label: '个人', value: 'personal' },
        { label: '企业', value: 'enterprise' },
      ],
    },
    {
      field: 'companyName',
      // 动态 Label (支持函数回调)：根据其他字段改变
      label: ({ model }) => `企业名称${model.userType === 'enterprise' ? ' (必填)' : ''}`,
      component: 'input',
      // 动态必填 (支持函数回调)：企业用户时该字段必填
      required: ({ model }) => model.userType === 'enterprise',
      // 动态显隐 (支持函数回调)
      hide: ({ model }) => model.userType !== 'enterprise',
    },
    {
      field: 'hasExperience',
      label: '是否有开发经验',
      component: 'switch',
    },
    {
      field: 'role',
      label: '主要开发语言',
      component: 'select',
      options: [
        { label: 'JavaScript / TypeScript', value: 'js' },
        { label: 'Rust', value: 'rust' },
        { label: 'Go', value: 'go' },
      ],
      // 动态禁用 (支持函数回调)
      disabled: ({ model }) => !model.hasExperience,
    },
    {
      field: 'dynamicRequiredField',
      // 动态 Label：直接绑定 Vue 外部的 Computed 响应式变量
      label: computed(() => `工单描述${dynamicLabelSuffix.value}`),
      component: 'input',
      // 动态属性 (支持函数回调)：根据外部变量和表单值综合控制 componentProps 表现
      componentProps: ({ model }) => {
        return {
          placeholder: model.userType === 'enterprise' 
            ? '请详细描述您遇到的企业级技术问题' 
            : '请描述您遇到的个人问题',
          type: 'textarea',
          autosize: { minRows: 2, maxRows: 4 }
        }
      }
    },
    {
      field: 'systemRole',
      label: '系统角色申请',
      component: 'select',
      options: [
        { label: '普通用户 (Guest)', value: 'guest' },
        { label: '系统管理员 (Admin)', value: 'admin' },
      ],
      placeholder: '选择系统管理员将触发更多联动必填项',
    },
    {
      field: 'reason',
      label: '管理员申请理由',
      component: 'input',
      componentProps: { type: 'textarea' },
      hide: ({ model }) => model.systemRole !== 'admin',
      required: ({ model }) => model.systemRole === 'admin',
    },
    {
      field: 'adminSecret',
      label: '高级特权密钥',
      component: 'input',
      componentProps: { type: 'password', showPasswordOn: 'click' },
      hide: ({ model }) => model.systemRole !== 'admin',
      required: ({ model }) => model.systemRole === 'admin',
    },
  ],
})

function toggleDay() {
  isWorkDay.value = !isWorkDay.value
}
</script>

<template>
  <div class="demo-dynamic-wrapper">
    <NSpace style="margin-bottom: 16px;">
      <NButton size="small" @click="toggleDay">
        切换外部状态 (当前: {{ isWorkDay ? '工作日' : '非工作日' }})
      </NButton>
    </NSpace>
    <SchemaForm v-bind="register" />
  </div>
</template>


