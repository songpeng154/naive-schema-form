<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { ref } from 'vue'

const model = ref({
  hasExperience: false,
  companyName: '',
  education: 'bachelor',
  salary: null,
})

const { register } = useSchemaForm(model, {
  labelWidth: 120,
  schema: [
    {
      field: 'hasExperience',
      label: '是否有工作经验',
      component: 'switch',
      tooltip: '开启后将展示前公司填写框',
    },
    {
      field: 'companyName',
      label: '前公司名称',
      component: 'input',
      required: true,
      // 动态显隐：根据 model 的状态实时计算
      hide: ({ model }) => !model.hasExperience,
    },
    {
      field: 'education',
      label: '最高学历',
      component: 'select',
      options: [
        { label: '大专', value: 'college' },
        { label: '本科', value: 'bachelor' },
        { label: '硕士', value: 'master' },
      ],
    },
    {
      field: 'salary',
      label: '期望薪资',
      component: 'inputNumber',
      // 动态组件属性：根据学历限制最高能填的薪资
      componentProps: ({ model }) => {
        const maxSalaryMap: Record<string, number> = {
          college: 15000,
          bachelor: 25000,
          master: 40000,
        }
        const max = maxSalaryMap[model.education] || 10000
        return {
          max,
          placeholder: `当前学历最高可填 ${max}`,
        }
      },
    },
  ],
})
</script>

<template>
  <SchemaForm v-bind="register" />
</template>
