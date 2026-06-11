<script setup lang="ts">
import { ref } from 'vue'
import { useMessage } from 'naive-ui'
import { SchemaForm } from '../../../src'

const message = useMessage()

// 传统的 Model 响应式对象
const model = ref({
  productName: '',
  brand: null,
  isImported: false,
  originCountry: '',
  stock: 100,
  tags: []
})

// 传统的 Schema 数组定义，不经过 hook
const schema = [
  {
    field: 'productName',
    label: '商品名称',
    component: 'input',
    required: true,
    gridItemProps: 24,
    componentProps: { placeholder: '输入标准的商品标题' }
  },
  {
    field: 'brand',
    label: '归属品牌',
    component: 'select',
    gridItemProps: 12,
    componentProps: {
      options: [
        { label: '苹果 (Apple)', value: 'apple' },
        { label: '华为 (Huawei)', value: 'huawei' },
        { label: '小米 (Xiaomi)', value: 'xiaomi' }
      ]
    }
  },
  {
    field: 'isImported',
    label: '是否为进口商品',
    component: 'switch',
    gridItemProps: 12
  },
  {
    field: 'originCountry',
    label: '原产国',
    component: 'input',
    gridItemProps: 24,
    hide: ({ model }: any) => !model.isImported,
    required: ({ model }: any) => model.isImported,
    componentProps: { placeholder: '请输入原产国（如：美国、日本等）' }
  },
  {
    field: 'stock',
    label: '初始库存',
    component: 'inputNumber',
    gridItemProps: 12,
    componentProps: { min: 0 }
  },
  {
    field: 'tags',
    label: '营销标签',
    component: 'dynamicTags',
    gridItemProps: 24
  }
]

// 声明 ref 挂载组件实例，获取 Expose 方法
const formRef = ref<any>(null)

const submitLoading = ref(false)

const handleValidate = async () => {
  try {
    await formRef.value?.validate()
    submitLoading.value = true
    setTimeout(() => {
      submitLoading.value = false
      message.success('手动校验通过（无 Hook 绑定）！')
    }, 800)
  } catch (err) {
    message.error('校验失败，请检查填写内容')
    // 演示手动调用暴露的方法
    formRef.value?.scrollToField('productName')
  }
}

const handleReset = () => {
  formRef.value?.resetFields()
  message.info('表单已重置，直接调用了暴露的实例方法')
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header border-b">
        <div class="header-left">
          <div class="icon-box i-carbon:code"></div>
          <div class="title-info">
            <h3>传统无 Hook 模式 (SchemaForm Component)</h3>
            <p>展示了直接通过 <code>:model</code> 和 <code>:schema</code> 传参，以及利用 <code>ref</code> 实例手动调用方法的最基础用法。</p>
          </div>
        </div>
        <div class="header-actions">
          <n-button secondary @click="handleReset">清空重置</n-button>
          <n-button type="primary" :loading="submitLoading" @click="handleValidate">手动校验</n-button>
        </div>
      </div>
      
      <div class="card-body">
        <n-alert title="双向绑定的魅力" type="info" class="mb-24px rounded-8px">
          即使不使用 Hook，由于我们在 Vue 中直接将 <code>model</code> 传给了组件（或通过 <code>v-model:model</code>），内部表单控件的任何修改仍然会实时同步到外部的响应式对象上。
        </n-alert>

        <!-- 传统组件属性传参与 ref 绑定实例方法 -->
        <!-- 注意：支持 v-model:model="model" 或者 :model="model" -->
        <SchemaForm
          ref="formRef"
          v-model:model="model"
          :schema="schema"
          :grid-props="{ cols: 24, xGap: 24 }"
        />
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
