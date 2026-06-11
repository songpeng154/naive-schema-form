<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { SchemaForm, useSchemaForm } from '../../../../src'

const message = useMessage()

const model = ref({
  apiEndpoint: '',
  maxRps: 1000,
  webhookUrl: '',
  alertEmail: '',
  customConfig: ''
})

const { register, validate, resetFields } = useSchemaForm(model, {
  gridProps: { cols: 24, xGap: 24 },
  labelWidth: 160,
  schema: [
    {
      field: 'apiEndpoint',
      label: '核心 API 端点',
      component: 'input',
      gridItemProps: 24,
      required: true,
      componentSlots: {
        prefix: () => 'https://api.myapp.com/v1/',
        suffix: () => '.json'
      }
    },
    {
      field: 'maxRps',
      label: '最大并发速率 (RPS)',
      component: 'inputNumber',
      gridItemProps: 12,
      componentSlots: {
        suffix: () => 'req / sec'
      }
    },
    {
      field: 'webhookUrl',
      label: '告警 Webhook',
      component: 'input',
      gridItemProps: 12,
      componentSlots: {
        prefix: () => 'POST'
      }
    },
    {
      field: 'alertEmail',
      label: '运维抄送邮箱',
      component: 'autoComplete',
      gridItemProps: 24,
      componentProps: {
        options: ['@gmail.com', '@company.com', '@admin.io'].map(
          (suffix) => {
            const prefix = model.value.alertEmail.split('@')[0]
            return {
              label: prefix + suffix,
              value: prefix + suffix
            }
          }
        )
      }
    },
    {
      field: 'customConfig',
      label: '底层协议定制',
      gridItemProps: 24,
      slot: 'custom-protocol-slot', // 使用具名插槽完全接管
      tooltip: '开启高级定制后可注入原始 JSON 配置'
    }
  ]
})

const handleValidate = async () => {
  try {
    await validate()
    message.success('校验通过！')
  } catch (err) {
    message.error('校验不通过')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:magic-wand"></div>
          <div class="title-info">
            <h3>深度定制与插槽接管</h3>
            <p>展示 <code>componentSlots</code> 内联组件插槽以及外挂 <code>slot</code> 渲染任意 Vue 模板的能力。</p>
          </div>
        </div>
        <div class="header-actions">
          <n-button secondary @click="resetFields">清空</n-button>
          <n-button type="primary" @click="handleValidate">开始巡检</n-button>
        </div>
      </div>
      
      <div class="card-body">
        <SchemaForm v-bind="register">
          <!-- 外部 Slot 自定义渲染 -->
          <template #custom-protocol-slot>
            <div class="custom-slot-box">
              <n-input
                v-model:value="model.customConfig"
                type="textarea"
                placeholder='{ "protocol": "gRPC", "timeout": 5000 }'
                :rows="4"
              />
              <div class="slot-footer">
                <n-text depth="3" class="text-12px">
                  👆 这是一个被 <code>&lt;template #custom-protocol-slot&gt;</code> 渲染出来的原生 Naive 组件，它仍然受到 SchemaForm 的生命周期管理。
                </n-text>
              </div>
            </div>
          </template>
        </SchemaForm>
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

.custom-slot-box {
  border: 1px dashed #e2e8f0;
  padding: 16px;
  border-radius: 8px;
  background-color: #f8fafc;
}

:global(.is-dark) .custom-slot-box {
  border: 1px dashed #ffffff17;
  background-color: #141418;
}

.slot-footer {
  margin-top: 8px;
}

</style>
