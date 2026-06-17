<script setup lang="ts">
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from '../../../../src/index'

// 1. 初始化 Model，包含更丰富的数据类型
const model = ref<Record<string, any>>({
  username: '',
  password: '',
  role: null,
  gender: 'male',
  hobbies: [],
  isActive: true,
  birthday: null,
  workTime: null,
  age: 25,
  score: 80,
  rating: 4,
  themeColor: '#18a058',
})

// 2. 严格只传 model 和 schema，但扩充 schema 以测试各种原生组件的基础渲染情况
const { register } = useSchemaForm(model, {
  schema: [
    {
      field: 'username',
      label: '用户名',
      component: 'input',
    },
    {
      field: 'password',
      label: '密码',
      component: 'input',
      componentProps: {
        type: 'password',

      },
    },
    {
      field: 'role',
      label: '角色',
      component: 'select',
      options: [
        { label: '管理员', value: 'admin' },
        { label: '普通用户', value: 'user' },
      ],
    },
    {
      field: 'gender',
      label: '性别',
      component: 'radioGroup',
      options: [
        { label: '男', value: 'male' },
        { label: '女', value: 'female' },
      ],
    },
    {
      field: 'hobbies',
      label: '爱好',
      component: 'checkboxGroup',
      options: [
        { label: '编程', value: 'coding' },
        { label: '阅读', value: 'reading' },
        { label: '运动', value: 'sports' },
      ],
    },
    {
      field: 'birthday',
      label: '出生日期',
      component: 'datePicker',
      componentProps: {
        type: 'date',
      },
    },
    {
      field: 'workTime',
      label: '工作时间',
      component: 'timePicker',
    },
    {
      field: 'isActive',
      label: '是否启用',
      component: 'switch',
    },
    {
      field: 'age',
      label: '年龄',
      component: 'inputNumber',
    },
    {
      field: 'score',
      label: '分数',
      component: 'slider',
    },
    {
      field: 'rating',
      label: '评分',
      component: 'rate',
    },
    {
      field: 'themeColor',
      label: '主题色',
      component: 'colorPicker',
    },
  ] as any,
})
</script>

<template>
  <div style="display: flex; gap: 24px;">
    <!-- 左侧：渲染组件 -->
    <div style="flex: 1; background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
      <SchemaForm v-bind="register" />
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
