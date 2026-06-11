<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { SchemaForm, useSchemaForm } from '../../../../src'

const message = useMessage()

const model = ref({
  cloudProvider: 'aliyun',
  instanceType: null,
  isVip: false,
  vipCode: '',
  enableHighAvailability: false,
  haRegion: null
})

const { register, validate, resetFields } = useSchemaForm(model, {
  gridProps: { cols: 24, xGap: 24 },
  labelWidth: 140,
  schema: [
    {
      field: 'cloudProvider',
      label: '云服务提供商',
      component: 'radioGroup',
      gridItemProps: 24,
      componentProps: {
        options: [
          { label: '阿里云', value: 'aliyun' },
          { label: '腾讯云', value: 'tencent' },
          { label: 'AWS', value: 'aws' }
        ]
      }
    },
    {
      field: 'instanceType',
      label: '实例规格',
      component: 'select',
      gridItemProps: 12,
      required: true,
      componentProps: {
        options: [
          { label: '通用型 (2核4G)', value: 'general' },
          { label: '计算型 (4核8G)', value: 'compute' },
          { label: '内存型 (4核16G)', value: 'memory' }
        ]
      }
    },
    {
      field: 'isVip',
      label: '是否为大客户',
      component: 'switch',
      gridItemProps: 12
    },
    {
      field: 'vipCode',
      label: '大客户授权码',
      component: 'input',
      gridItemProps: 24,
      // 动态显示：仅大客户显示
      hide: ({ model }) => !model.isVip,
      // 动态必填：是大客户则必须输入授权码
      required: ({ model }) => model.isVip,
      componentProps: {
        placeholder: '输入您的专属大客户六位授权码'
      }
    },
    {
      field: 'enableHighAvailability',
      label: '开启同城双活 (HA)',
      component: 'switch',
      gridItemProps: 12,
      // 动态禁用：只有计算型或内存型才能开启 HA
      disabled: ({ model }) => model.instanceType === 'general' || !model.instanceType,
      tooltip: '通用型实例不支持开启同城双活'
    },
    {
      field: 'haRegion',
      label: '灾备可用区',
      component: 'select',
      gridItemProps: 12,
      // 动态必填：如果开启了双活，必须选择可用区
      required: ({ model }) => model.enableHighAvailability,
      disabled: ({ model }) => !model.enableHighAvailability,
      componentProps: {
        options: [
          { label: '可用区 A', value: 'zone-a' },
          { label: '可用区 B', value: 'zone-b' }
        ]
      }
    }
  ]
})

const handleValidate = async () => {
  try {
    await validate()
    message.success('校验通过，配置已就绪！')
  } catch (err) {
    message.error('存在配置冲突或未填项，请检查')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:network-4"></div>
          <div class="title-info">
            <h3>多级动态联动与状态流转</h3>
            <p>展示函数式配置能力：基于 <code>model</code> 动态控制字段的 <code>hide</code>、<code>disabled</code> 和 <code>required</code>。</p>
          </div>
        </div>
        <div class="header-actions">
          <n-button secondary @click="resetFields">重置</n-button>
          <n-button type="primary" @click="handleValidate">提交配置</n-button>
        </div>
      </div>
      
      <div class="card-body">
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

</style>
