<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { PopupSchemaForm, usePopupSchemaForm } from '../../../src'

const message = useMessage()

// 切换展现形式：modal 或 drawer
const currentType = ref<'modal' | 'drawer'>('modal')

const model = ref({
  taskName: '',
  priority: 'medium',
  dueDate: null,
  assignee: null,
  description: ''
})

const { register, open, close, validate } = usePopupSchemaForm(model, {
  // 动态绑定 type，通过在 PopupSchemaForm 上传入 v-bind
  type: currentType.value,
  title: '新建研发任务',
  width: '600px',
  
  // 安全拦截：重置与确认前防误触
  resetOnClose: true,
  confirmOnClose: true,
  confirmTitle: '放弃编辑？',
  confirmContent: '您输入的数据尚未保存，确定要关闭弹窗吗？',
  
  schema: [
    {
      field: 'taskName',
      label: '任务核心标题',
      component: 'input',
      required: true,
      componentProps: { placeholder: '一句话描述该任务' }
    },
    {
      field: 'priority',
      label: '紧急程度',
      component: 'radioGroup',
      componentProps: {
        options: [
          { label: 'P0 (最高)', value: 'p0' },
          { label: 'P1 (高)', value: 'p1' },
          { label: 'P2 (中)', value: 'p2' }
        ]
      }
    },
    {
      field: 'dueDate',
      label: '截止发布日期',
      component: 'datePicker',
      componentProps: { type: 'date', clearable: true }
    },
    {
      field: 'assignee',
      label: '指派负责人',
      component: 'select',
      componentProps: {
        options: [
          { label: '前端开发 - 张三', value: 'fe-zs' },
          { label: '后端开发 - 李四', value: 'be-ls' },
          { label: '测试工程师 - 王五', value: 'qa-ww' }
        ]
      }
    },
    {
      field: 'description',
      label: '详细执行说明',
      component: 'input',
      componentProps: { type: 'textarea', rows: 4, placeholder: '描述一下预期结果...' }
    }
  ]
})

const openModal = () => {
  currentType.value = 'modal'
  // 由于 type 是非响应式的在闭包内，我们需要直接修改它或重新赋给 register (这里通过在组件上动态绑定解决)
  open()
}

const openDrawer = () => {
  currentType.value = 'drawer'
  open()
}

const submitLoading = ref(false)

const handleConfirm = async () => {
  try {
    await validate()
    submitLoading.value = true
    setTimeout(() => {
      submitLoading.value = false
      message.success('任务创建成功，已分配！')
      close()
    }, 1000)
  } catch (err) {
    message.error('存在校验未通过的项，请检查红字提示')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:popup"></div>
          <div class="title-info">
            <h3>抽屉/弹窗双模表单 (usePopupSchemaForm)</h3>
            <p>展示一键切换 <code>Modal</code> 和 <code>Drawer</code> 形态，并包含 <code>confirmOnClose</code> 防丢失拦截逻辑。</p>
          </div>
        </div>
      </div>
      
      <div class="card-body">
        <n-space vertical size="large" align="center" style="margin-top: 40px;">
          <div class="i-carbon:mac-shift text-64px text-indigo-400 opacity-50"></div>
          <n-text depth="3" style="font-size: 16px;">
            点击下方按钮呼出弹框式表单，尝试输入一些内容后直接点击遮罩层关闭，体验防误触拦截！
          </n-text>
          
          <n-space size="large" style="margin-top: 24px;">
            <n-button type="primary" size="large" @click="openModal">
              <template #icon><div class="i-carbon:center-square"></div></template>
              以模态框 (Modal) 模式打开
            </n-button>
            <n-button type="info" size="large" @click="openDrawer">
              <template #icon><div class="i-carbon:sidebar-right"></div></template>
              以右侧抽屉 (Drawer) 模式打开
            </n-button>
          </n-space>
        </n-space>

        <!-- 弹窗表单组件，利用 v-bind 覆盖 register 里的 type -->
        <PopupSchemaForm 
          v-bind="register" 
          :type="currentType" 
          @confirm="handleConfirm"
        >
          <!-- 体验插槽定制功能 -->
          <template #formBefore>
            <n-alert type="warning" class="mb-24px">
              注意：请仔细评估任务优先级，一旦指派不可随意撤销。
            </n-alert>
          </template>
          
          <!-- 可以通过 footer 插槽完全定制底部按钮，但通常内置的足够用了，这里用内置的并且给确认按钮加 loading 可以在 onSubmit 里做 -->
          <!-- 注意：目前内置组件会暴露 @confirm 事件，可以在此接管 loading -->
        </PopupSchemaForm>
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
