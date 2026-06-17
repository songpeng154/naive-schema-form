<script setup lang="ts">
import { NAlert, NButton, NSpace, useMessage } from 'naive-ui'
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from '../../../../src/index'

const message = useMessage()

// 初始化 Model
const model = ref<Record<string, any>>({
  // 自动校验字段
  autoRequiredStr: '',
  autoRequiredSelect: null,

  // 手动规则字段
  customRuleStr: '',
  customRuleNum: null,

  // 组合校验字段
  combinedRule: '',

  // 预设规则与复杂校验
  regexRule: '',
})

// 错误信息状态
const validationErrors = ref<any>(null)

// 组合测试：表单校验多维度测试
const { register, validate, restoreValidation, resetFields } = useSchemaForm(model, {
  labelWidth: 160,
  labelPlacement: 'left',
  gridProps: { cols: 1, yGap: 16 }, // 单列垂直排布，增加间距

  // 开启自动必填校验（默认就是 true）
  autoRequiredRule: true,

  // 绑定自带按钮触发的事件
  onFinish: (data) => {
    validationErrors.value = null
    message.success('自带提交：校验通过！数据已打印')
    console.log('onFinish Data:', data)
  },
  onFinishFailed: (errors) => {
    message.error('自带提交：校验失败，请检查表单')
    validationErrors.value = errors
    console.error('onFinishFailed Errors:', errors)
  },

  schema: [
    {
      field: 'autoRequiredStr',
      label: '自动必填 (Input)',
      component: 'input',
      // 只写 required: true，底层基于 autoRequiredRule 会自动生成 `请输入自动必填 (Input)` 的校验规则
      required: true,
      tooltip: '仅设置 required: true，依赖内部机制自动生成 rule',
    },
    {
      field: 'autoRequiredSelect',
      label: '自动必填 (Select)',
      component: 'select',
      options: [
        { label: '选项1', value: '1' },
        { label: '选项2', value: '2' },
      ],
      // 只写 required: true，对于 select 会自动生成 `请选择自动必填 (Select)` 的校验规则
      required: true,
      tooltip: 'Select 组件会自动匹配“请选择”文案',
    },
    {
      field: 'customRuleStr',
      label: '纯自定义规则 (Custom)',
      component: 'input',
      // 不写 required，完全自己写 rules
      rules: {
        required: true,
        message: '这是我手写的必填提示文案',
        trigger: ['input', 'blur'],
      },
      tooltip: '完全跳过 auto 机制，使用自己手写的 rule 对象',
    },
    {
      field: 'customRuleNum',
      label: '数值范围 (Custom)',
      component: 'inputNumber',
      rules: {
        type: 'number',
        required: true,
        min: 10,
        max: 100,
        message: '数值必须在 10 到 100 之间',
        trigger: ['input', 'blur'],
      },
    },
    {
      field: 'combinedRule',
      label: '组合校验 (Auto + Custom)',
      component: 'input',
      rules: {
        min: 5,
        max: 10,
        message: '长度必须在 5 到 10 个字符之间',
        trigger: ['input', 'blur'],
        required: true,
      },
      tooltip: '同时开启 required: true 和手写的长度限制 rule，测试二者合并效果',
    },
    {
      field: 'regexRule',
      label: '正则校验',
      component: 'input',
      rules: {
        pattern: /^[\w-]{4,16}$/,
        message: '格式错误：需为 4 到 16 位的字母、数字、下划线',
        trigger: ['input', 'blur'],
      },
    },
  ] as any,
})

// 外部触发校验（测试 Expose API）
async function handleValidate() {
  validationErrors.value = null
  try {
    await validate()
    message.success('外部调用：校验通过！')
  }
  catch (errors) {
    message.error('外部调用：校验失败')
    validationErrors.value = errors
  }
}

// 恢复初始校验状态（清除标红）
function handleRestore() {
  restoreValidation()
  validationErrors.value = null
  message.info('外部调用：已清除校验状态')
}

// 重置数据与状态
function handleReset() {
  resetFields()
  validationErrors.value = null
  message.info('外部调用：已重置表单')
}
</script>

<template>
  <div style="display: flex; gap: 24px;">
    <!-- 左侧：渲染组件 -->
    <div style="flex: 1;">
      <NAlert title="校验行为测试" type="info" style="margin-bottom: 24px;">
        同时测试 <strong>自带按钮 (onFinish / onFinishFailed)</strong> 和 <strong>外部 Hook 调用 (validate / restore)</strong> 两种模式。
      </NAlert>

      <!-- 外部控制台面板（测试底层 API） -->
      <div style="margin-bottom: 24px; padding: 16px; background: #fff; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
        <NSpace align="center">
          <span style="font-weight: bold; margin-right: 8px;">外部 API 测试区:</span>
          <NButton type="primary" size="small" @click="handleValidate">
            调用 validate()
          </NButton>
          <NButton type="warning" size="small" @click="handleRestore">
            调用 restoreValidation()
          </NButton>
          <NButton size="small" @click="handleReset">
            调用 resetFields()
          </NButton>
        </NSpace>
      </div>

      <!-- 表单主体（加入滚动容器测试 scrollToFirstError） -->
      <div style="background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
        <NAlert type="warning" :show-icon="false" style="margin-bottom: 16px; font-size: 13px;">
          👇 <strong>滚动测试：</strong>下方表单被限制了高度。请先<strong>向下滚动到底部</strong>并点击自带的“提交”按钮，观察表单是否会自动滚动回到第一个报错的字段！
        </NAlert>

        <div style="height: 300px; overflow-y: auto; padding: 12px; border: 1px dashed #e5e7eb; border-radius: 4px; position: relative;">
          <!-- 刻意增加一点上下的内边距，让滚动距离更明显 -->
          <div style="padding-bottom: 200px;">
            <SchemaForm v-bind="register" />
          </div>
        </div>
      </div>
    </div>

    <!-- 右侧：实时输出内部 model 与校验错误状态 -->
    <div style="width: 350px; display: flex; flex-direction: column; gap: 16px;">
      <div style="background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-y: auto;">
        <h3 style="margin-top: 0; color: #e5c07b; font-size: 14px;">
          Current Model:
        </h3>
        <pre style="margin: 0; font-family: monospace; font-size: 13px;">{{ JSON.stringify(model, null, 2) }}</pre>
      </div>

      <div style="background: #282c34; color: #e06c75; padding: 20px; border-radius: 8px; overflow-y: auto; flex: 1;">
        <h3 style="margin-top: 0; color: #e06c75; font-size: 14px;">
          Validation Errors:
        </h3>
        <div v-if="!validationErrors" style="color: #abb2bf; font-size: 13px; opacity: 0.7;">
          暂无错误
        </div>
        <pre v-else style="margin: 0; font-family: monospace; font-size: 13px; white-space: pre-wrap;">{{ JSON.stringify(validationErrors, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>
