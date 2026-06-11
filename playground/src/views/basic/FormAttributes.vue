<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { ref, watch } from 'vue'
import { SchemaForm, useSchemaForm } from '../../../../src'

const message = useMessage()

const model = ref({
  account: '',
  password: '',
  remark: ''
})

const submitLoading = ref(false)

const { register, validate, resetFields } = useSchemaForm(model, {
  // --- 表单全局排版与属性控制 ---
  size: 'medium', // 'small' | 'medium' | 'large'
  inline: false,  // 是否为行内表单
  labelPlacement: 'left', // 'left' | 'top'
  labelAlign: 'right', // 'left' | 'right'
  requireMarkPlacement: 'left', // 必填星号位置
  showRequireMark: true,
  showLabel: true,
  showFeedback: true, // 是否显示底部报错信息占位
  labelOverflowOmitted: false,
  scrollToFirstError: true, // 校验失败自动滚动
  
  // 自定义校验提示文案模板
  validateMessages: {
    required: '此项是必填项，别漏啦！'
  },
  
  // 复杂的栅格配置
  gridProps: {
    cols: 24,
    xGap: 24,
    yGap: 12,
    responsive: 'screen'
  },
  
  schema: [
    {
      field: 'account',
      label: '管理账户',
      component: 'input',
      required: true,
      gridItemProps: { span: { sm: 24, md: 12, lg: 8 } },
      componentProps: { placeholder: '输入管理账户' }
    },
    {
      field: 'password',
      label: '高强度密码',
      component: 'input',
      required: true,
      gridItemProps: { span: { sm: 24, md: 12, lg: 8 } },
      componentProps: { type: 'password', showPasswordOn: 'click', placeholder: '输入高强度密码' }
    },
    {
      field: 'remark',
      label: '安全备注 (超长标签演示：这句话很长很长)',
      component: 'input',
      gridItemProps: { span: { sm: 24, md: 24, lg: 8 } },
      componentProps: { placeholder: '备注' }
    }
  ]
})

// 控制组件本身的 Props
const formConfig = ref({
  size: 'medium',
  labelPlacement: 'left',
  labelAlign: 'right',
  requireMarkPlacement: 'left',
  inline: false,
  showFeedback: true,
  labelOverflowOmitted: false,
  submitLoading: false
})

// 监听控制栏变化，响应式赋给 SchemaForm
watch(formConfig, (newVal) => {
  Object.assign(register.value, newVal)
}, { deep: true })

// 模拟异步提交
const handleSubmit = async () => {
  try {
    await validate()
    formConfig.value.submitLoading = true
    setTimeout(() => {
      formConfig.value.submitLoading = false
      message.success('提交成功！体验了 scrollToFirstError 和 submitLoading。')
    }, 1500)
  } catch (err) {
    message.error('校验失败，已自动滚动到第一个错误字段')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:color-palette"></div>
          <div class="title-info">
            <h3>表单属性与排版艺术</h3>
            <p>展示全局级别的 <code>size</code>、<code>labelPlacement</code>、<code>inline</code> 以及栅格自适应。调整下方控制器查看效果！</p>
          </div>
        </div>
        <div class="header-actions">
          <n-button secondary @click="resetFields">重置</n-button>
          <n-button type="primary" :loading="formConfig.submitLoading" @click="handleSubmit">防抖提交</n-button>
        </div>
      </div>
      
      <div class="card-body">
        <n-alert title="排版与属性控制台" type="info" class="mb-24px rounded-8px">
          <n-space align="center" size="large">
            <n-radio-group v-model:value="formConfig.size">
              <n-radio-button value="small">Small</n-radio-button>
              <n-radio-button value="medium">Medium</n-radio-button>
              <n-radio-button value="large">Large</n-radio-button>
            </n-radio-group>
            
            <n-radio-group v-model:value="formConfig.labelPlacement">
              <n-radio-button value="left">Label Left</n-radio-button>
              <n-radio-button value="top">Label Top</n-radio-button>
            </n-radio-group>

            <n-radio-group v-model:value="formConfig.labelAlign">
              <n-radio-button value="left">Align Left</n-radio-button>
              <n-radio-button value="right">Align Right</n-radio-button>
            </n-radio-group>

            <n-switch v-model:value="formConfig.inline">
              <template #checked>Inline Mode On</template>
              <template #unchecked>Inline Mode Off</template>
            </n-switch>

            <n-switch v-model:value="formConfig.labelOverflowOmitted">
              <template #checked>标签超长省略 (Omitted)</template>
              <template #unchecked>标签自然换行</template>
            </n-switch>
          </n-space>
        </n-alert>

        <SchemaForm v-bind="register" />
      </div>
    </div>

    <div class="glass-card monitor-section">
      <div class="card-header border-b">
        <div class="title-info">
          <h3>实时数据流 (Model)</h3>
        </div>
      </div>
      <n-scrollbar style="height: calc(100vh - 200px);">
        <pre class="json-pre">{{ JSON.stringify(model, null, 2) }}</pre>
      </n-scrollbar>
    </div>
  </div>
</template>

<style scoped>

.page-wrapper {
  display: grid;
  grid-template-columns: minmax(0, 2fr) minmax(0, 1fr);
  gap: 24px;
  height: 100%;
}

.glass-card {
  background: #ffffff;
  border: 1px solid #efeff5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

:global(.is-dark) .glass-card {
  background: #18181c;
  border: 1px solid #ffffff17;
}

.card-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header.border-b {
  border-bottom: 1px solid #efeff5;
}

:global(.is-dark) .card-header.border-b {
  border-bottom: 1px solid #ffffff17;
}

.header-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.icon-box {
  width: 32px;
  height: 32px;
  border-radius: 6px;
  background: #f4f4f8;
  color: #666;
  font-size: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

:global(.is-dark) .icon-box {
  background: #202024;
  color: #aaa;
}

.title-info h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
}

.title-info p {
  margin: 4px 0 0;
  font-size: 12px;
  color: #666;
}

:global(.is-dark) .title-info p {
  color: #999;
}

.header-actions {
  display: flex;
  gap: 12px;
}

.card-body {
  padding: 24px;
  flex: 1;
  overflow-y: auto;
}

.json-pre {
  margin: 0;
  padding: 20px;
  font-family: monospace;
  font-size: 12px;
  color: #333;
}

:global(.is-dark) .json-pre {
  color: #ccc;
}

.mb-24px { margin-bottom: 24px; }
.rounded-8px { border-radius: 8px; }

</style>
