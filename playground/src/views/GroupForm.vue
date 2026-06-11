<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { GroupSchemaForm, useGroupSchemaForm } from '../../../src'

const message = useMessage()

const model = ref({
  corpName: '',
  corpCode: '',
  foundDate: null,
  
  legalName: '',
  legalId: '',
  legalPhone: '',
  
  annualRevenue: null,
  taxGrade: null,
  hasAudit: false
})

const { register, validate, resetFields, toggleCollapsed } = useGroupSchemaForm(model, [
  {
    title: '第一步：企业基础信息',
    helpMessage: '请与营业执照上的信息保持绝对一致',
    defaultCollapsed: false,
    form: [
      {
        field: 'corpName',
        label: '企业工商名称',
        component: 'input',
        required: true,
        gridItemProps: 24,
        componentProps: { placeholder: '请输入企业名称' }
      },
      {
        field: 'corpCode',
        label: '统一社会信用代码',
        component: 'input',
        required: true,
        gridItemProps: 12,
        componentProps: { placeholder: '18位字符' }
      },
      {
        field: 'foundDate',
        label: '成立日期',
        component: 'datePicker',
        gridItemProps: 12,
        componentProps: { type: 'date' }
      }
    ]
  },
  {
    title: '第二步：法定代表人信息',
    // 隐藏折叠按钮
    hideCollapseButton: false,
    collapsedRows: 1, // 哪怕折叠，也展示第一行（姓名）作为预览
    defaultCollapsed: true,
    form: [
      {
        field: 'legalName',
        label: '法人姓名',
        component: 'input',
        required: true,
        gridItemProps: 12
      },
      {
        field: 'legalId',
        label: '身份证号',
        component: 'input',
        gridItemProps: 12
      },
      {
        field: 'legalPhone',
        label: '联系电话',
        component: 'input',
        gridItemProps: 24
      }
    ]
  },
  {
    title: '第三步：财务资质审查',
    form: [
      {
        field: 'annualRevenue',
        label: '上年营收 (万元)',
        component: 'inputNumber',
        gridItemProps: 12
      },
      {
        field: 'taxGrade',
        label: '纳税信用评级',
        component: 'select',
        gridItemProps: 12,
        componentProps: {
          options: [
            { label: 'A级 (优秀)', value: 'A' },
            { label: 'B级 (良好)', value: 'B' },
            { label: 'M级 (新设立)', value: 'M' },
            { label: 'C/D级 (较差)', value: 'C' }
          ]
        }
      },
      {
        field: 'hasAudit',
        label: '是否有年度审计报告',
        component: 'switch',
        gridItemProps: 24
      }
    ]
  }
], {
  labelWidth: 140,
  gridProps: { cols: 24, xGap: 24 },
  // 自定义折叠与展开文字
  collapsedText: '展开此部分',
  expandedText: '收起隐藏'
})

const handleValidate = async () => {
  try {
    await validate()
    message.success('校验通过，企业资质审核已提交！')
  } catch (err) {
    message.error('校验失败，请展开所有折叠项检查必填值')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:cics-program"></div>
          <div class="title-info">
            <h3>长表单与分组策略 (useGroupSchemaForm)</h3>
            <p>展示 <code>defaultCollapsed</code>、<code>collapsedRows</code> 和 <code>helpMessage</code> 等长表单专项优化。</p>
          </div>
        </div>
        <div class="header-actions">
          <n-button secondary @click="resetFields">重新填写</n-button>
          <n-button type="primary" @click="handleValidate">提交企业认证</n-button>
        </div>
      </div>
      
      <div class="card-body group-wrapper">
        <n-space style="margin-bottom: 24px;">
          <n-button size="small" @click="toggleCollapsed(0)">折叠/展开 第一部分</n-button>
          <n-button size="small" @click="toggleCollapsed(1)">折叠/展开 第二部分</n-button>
        </n-space>

        <GroupSchemaForm v-bind="register">
          <!-- 演示插槽：自定义卡片标题区 -->
          <!-- <template #groupTitle="{ config }">
            <span class="custom-group-title">🔰 {{ config.title }}</span>
          </template> -->
        </GroupSchemaForm>
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

/* Group 独有样式调整，使得折叠卡片更好看 */
.group-wrapper :deep(.n-card) {
  background-color: #fafafc;
  border-radius: 8px;
  margin-bottom: 16px;
  border: 1px solid #efeff5;
}

:global(.is-dark) .group-wrapper :deep(.n-card) {
  background-color: #141418;
  border: 1px solid #ffffff17;
}

.custom-group-title {
  font-weight: bold;
  color: #6366f1;
}

</style>
