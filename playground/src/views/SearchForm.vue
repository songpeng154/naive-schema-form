<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { SearchSchemaForm, useSearchSchemaForm } from '../../../src'

const message = useMessage()

const model = ref({
  orderId: '',
  buyerName: '',
  orderStatus: null,
  dateRange: null,
  payMethod: null,
  logisticsCode: '',
  minAmount: null,
  maxAmount: null,
})

// 模拟异步查询动作
const searchLoading = ref(false)

const { register, validate, resetFields, toggleCollapsed } = useSearchSchemaForm(model, {
  // --- 查询表单独有配置 ---
  searchShowNumber: 3, // 默认只显示前3个，超出的收起

  // 绕过底层 grid 源码 bug，强制开启基于窗口的响应式

  // 自定义查询钩子
  onSubmit: async (validateFunc, currentModel) => {
    try {
      await validateFunc()
      searchLoading.value = true
      // 模拟后台接口请求
      setTimeout(() => {
        searchLoading.value = false
        message.success('查询完成！参数已传给后端。')
      }, 800)
    }
    catch {
      message.error('请修正高亮红框内的错误条件')
    }
  },

  schema: [
    {
      field: 'orderId',
      label: '订单编号',
      component: 'input',
      componentProps: { clearable: true },
    },
    {
      field: 'buyerName',
      label: '买家姓名',
      component: 'input',
    },
    {
      field: 'orderStatus',
      label: '交易状态',
      component: 'select',
      componentProps: {
        clearable: true,
        options: [
          { label: '待付款', value: 'unpaid' },
          { label: '已付款待发货', value: 'paid' },
          { label: '已发货', value: 'shipped' },
          { label: '交易完成', value: 'done' },
          { label: '交易关闭', value: 'closed' },
        ],
      },
    },
    {
      field: 'dateRange',
      label: '下单时间',
      component: 'datePicker',
      componentProps: { type: 'daterange', clearable: true },
    },
    {
      field: 'payMethod',
      label: '支付渠道',
      component: 'select',
      componentProps: {
        options: [
          { label: '支付宝', value: 'alipay' },
          { label: '微信支付', value: 'wechat' },
          { label: '银联云闪付', value: 'unionpay' },
        ],
      },
    },
    {
      field: 'logisticsCode',
      label: '物流单号',
      component: 'input',
    },
    {
      field: 'minAmount',
      label: '最小金额',
      component: 'inputNumber',
    },
    {
      field: 'maxAmount',
      label: '最大金额',
      component: 'inputNumber',
    },
  ],
})
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section-full">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:search-advanced" />
          <div class="title-info">
            <h3>极客版查询表单 (useSearchSchemaForm)</h3>
            <p>展示了 ERP 及后台管理系统中最经典的头部查询架构，包含 <code>searchShowNumber</code> 和自动折叠。</p>
          </div>
        </div>
      </div>

      <div class="card-body">
        <!-- 这是一个高度集成的组件，自带查询和重置按钮 -->
        <SearchSchemaForm v-bind="register" />
      </div>
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

.page-wrapper {
  display: block; /* 覆盖 grid 布局 */
  height: 100%;
}
.mb-24px { margin-bottom: 24px; }
.rounded-8px { border-radius: 8px; }
</style>
