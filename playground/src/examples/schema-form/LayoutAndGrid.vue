<script setup lang="ts">
import type { FormProps } from 'naive-ui'
import { NRadioButton, NRadioGroup, NSpace } from 'naive-ui'
import { computed, reactive, ref } from 'vue'
import { SchemaForm, useSchemaForm } from '../../../../src/index'

type FormLabelPlacement = NonNullable<FormProps['labelPlacement']>

// 配置状态切换
const configState = reactive({
  labelPlacement: 'left' as FormLabelPlacement,
  autoLabelWidth: true,
})

// 初始化 Model
const model = ref<Record<string, any>>({
  firstName: '',
  middleName: '',
  lastName: '',
  birthDate: null,
  joinTime: null,
  department: null,
  position: '',
  level: null,
  employeeId: '',
  skills: [],
  isRemote: false,
  hasStock: false,
  baseSalary: 0,
  performanceScore: 50,
  leadershipScore: 3,
  workCity: null,
  themeColor: '#18a058',
  selfEvaluation: '',
})

// 组合测试：栅格引擎与表单排版
const { register } = useSchemaForm(model, {
  // 通过 computed 传参给 hook，在 v-bind 时 Vue 会自动解包 Ref，实现 Hook 层面的响应式控制
  labelPlacement: computed(() => configState.labelPlacement) as unknown as FormLabelPlacement,
  autoLabelWidth: computed(() => configState.autoLabelWidth) as unknown as boolean,

  // 全局栅格配置：将一行分为 24 列，横向间距 16，纵向间距 16
  gridProps: { cols: 24, xGap: 16, yGap: 16 },

  schema: [
    {
      field: 'firstName',
      label: '名 (First Name)',
      component: 'input',
      gridItemProps: { span: 8 },
    },
    {
      field: 'middleName',
      label: '中间名 (Middle Name)',
      component: 'input',
      gridItemProps: { span: 8 },
    },
    {
      field: 'lastName',
      label: '姓 (Last Name)',
      component: 'input',
      gridItemProps: { span: 8 },
    },
    {
      field: 'birthDate',
      label: '出生日期',
      component: 'datePicker',
      componentProps: { type: 'date', style: { width: '100%' } },
      gridItemProps: { span: 12 },
    },
    {
      field: 'joinTime',
      label: '入职时间',
      component: 'timePicker',
      componentProps: { style: { width: '100%' } },
      gridItemProps: { span: 12 },
    },
    {
      field: 'department',
      label: '所属部门',
      component: 'select',
      options: [
        { label: '研发部', value: 'rd' },
        { label: '市场部', value: 'marketing' },
        { label: '人事部', value: 'hr' },
      ],
      gridItemProps: { span: 6 },
    },
    {
      field: 'position',
      label: '职位',
      component: 'input',
      gridItemProps: { span: 6 },
    },
    {
      field: 'level',
      label: '职级',
      component: 'select',
      options: [
        { label: 'P5', value: 'p5' },
        { label: 'P6', value: 'p6' },
        { label: 'P7', value: 'p7' },
      ],
      gridItemProps: { span: 6 },
    },
    {
      field: 'employeeId',
      label: '工号',
      component: 'input',
      gridItemProps: { span: 6 },
    },
    {
      field: 'skills',
      label: '专业技能',
      component: 'checkboxGroup',
      options: [
        { label: 'Vue3', value: 'vue3' },
        { label: 'TypeScript', value: 'ts' },
        { label: 'Node.js', value: 'node' },
        { label: 'Golang', value: 'go' },
        { label: 'Python', value: 'python' },
      ],
      gridItemProps: { span: 24 },
    },
    {
      field: 'isRemote',
      label: '支持远程',
      component: 'switch',
      gridItemProps: { span: 4 },
    },
    {
      field: 'hasStock',
      label: '持有期权',
      component: 'switch',
      gridItemProps: { span: 4 },
    },
    {
      field: 'baseSalary',
      label: '基本薪资',
      component: 'inputNumber',
      componentProps: { step: 1000 },
      // 故意设置偏移测试：前面的组件占 8 列，这里 offset 8，使其靠右对齐
      gridItemProps: { span: 8, offset: 8 },
    },
    {
      field: 'performanceScore',
      label: '绩效评分',
      component: 'slider',
      gridItemProps: { span: 12 },
    },
    {
      field: 'leadershipScore',
      label: '领导力评级',
      component: 'rate',
      gridItemProps: { span: 12 },
    },
    {
      field: 'themeColor',
      label: '后台主题色偏好',
      component: 'colorPicker',
      gridItemProps: { span: 12 },
    },
    {
      field: 'selfEvaluation',
      label: '员工自我评价',
      component: 'input',
      componentProps: { type: 'textarea', rows: 4 },
      gridItemProps: { span: 24 },
    },
  ] as any,
})
</script>

<template>
  <div style="display: flex; gap: 24px;">
    <!-- 左侧：渲染组件 -->
    <div style="flex: 1;">
      <!-- 控制台面板 -->
      <div style="margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
        <NSpace align="center" item-style="display: flex; align-items: center;">
          <span style="font-weight: bold; margin-right: 8px;">排版控制器:</span>

          <NRadioGroup v-model:value="configState.labelPlacement" size="small">
            <NRadioButton value="left">
              标签居左
            </NRadioButton>
            <NRadioButton value="top">
              标签置顶
            </NRadioButton>
          </NRadioGroup>

          <NRadioGroup v-model:value="configState.autoLabelWidth" size="small" :disabled="configState.labelPlacement === 'top'">
            <NRadioButton :value="true">
              自动标签宽度
            </NRadioButton>
            <NRadioButton :value="false">
              固定标签宽度
            </NRadioButton>
          </NRadioGroup>
        </NSpace>
      </div>

      <!-- 表单主体 -->
      <div style="background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
        <SchemaForm v-bind="register" />
      </div>
    </div>

    <!-- 右侧：实时输出内部 model 状态 -->
    <div style="width: 350px; background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-y: auto;">
      <h3 style="margin-top: 0; color: #e5c07b; font-size: 14px;">
        Current Model:
      </h3>
      <pre style="margin: 0; font-family: monospace; font-size: 13px;">{{ JSON.stringify(model, null, 2) }}</pre>
    </div>
  </div>
</template>
