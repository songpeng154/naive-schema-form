<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { ref } from 'vue'
import { SchemaForm, useSchemaForm } from '../../../../src'

const message = useMessage()

// 极其丰满的初始模型
const model = ref({
  username: '',
  personalWebsite: '',
  age: 25,
  birthday: null,
  workTime: null,
  skills: ['Vue3', 'TypeScript'],
  proficiency: 80,
  isRemote: true,
  jobCategory: null,
  colorPreference: '#6366f1',
  score: 4,
  resume: [],
  department: null
})

const { register, validate, resetFields } = useSchemaForm(model, {
  autoPlaceholder: true, 
  autoRequiredRule: true,
  labelPlacement: 'left',
  labelWidth: 120, // 统一的基础宽度
  defaultDateFormat: 'yyyy-MM-dd',
  // 采用 grid 布局展现精美的排版
  gridProps: { cols: 24, xGap: 24, yGap: 0 },
  schema: [
    {
      field: 'username',
      label: '用户姓名',
      component: 'input',
      gridItemProps: 12,
      required: true,
      tooltip: '请输入您的真实姓名，用于身份验证',
      componentProps: { clearable: true }
    },
    {
      field: 'personalWebsite',
      label: '个人主页',
      component: 'input',
      gridItemProps: 12,
      rules: 'url', // 使用内置 url 校验
      componentProps: {
        clearable: true
      }
    },
    {
      field: 'age',
      label: '年龄',
      component: 'inputNumber',
      gridItemProps: 12,
      componentProps: { min: 18, max: 60 }
    },
    {
      field: 'birthday',
      label: '出生日期',
      component: 'datePicker',
      gridItemProps: 12,
      componentProps: { type: 'date', clearable: true }
    },
    {
      field: 'skills',
      label: '专业技能',
      component: 'dynamicTags',
      gridItemProps: 24,
      tooltip: '敲击回车以生成新的技能标签'
    },
    {
      field: 'proficiency',
      label: '熟练度评估',
      component: 'slider',
      gridItemProps: 12,
      componentProps: { step: 10, marks: { 0: '菜鸟', 50: '熟练', 100: '精通' } }
    },
    {
      field: 'score',
      label: '自评星级',
      component: 'rate',
      gridItemProps: 12,
      componentProps: { allowHalf: true }
    },
    {
      field: 'jobCategory',
      label: '职位类目',
      component: 'cascader',
      gridItemProps: 12,
      required: true,
      componentProps: {
        options: [
          {
            label: '技术部',
            value: 'tech',
            children: [{ label: '前端开发', value: 'fe' }, { label: '后端开发', value: 'be' }]
          },
          {
            label: '设计部',
            value: 'design',
            children: [{ label: 'UI设计', value: 'ui' }]
          }
        ],
        checkStrategy: 'child'
      }
    },
    {
      field: 'department',
      label: '所属组织',
      component: 'treeSelect',
      gridItemProps: 12,
      componentProps: {
        options: [
          {
            label: '总公司',
            key: 'hq',
            children: [{ label: '研发中心', key: 'rd' }, { label: '营销中心', key: 'marketing' }]
          }
        ]
      }
    },
    {
      field: 'colorPreference',
      label: '偏好颜色',
      component: 'colorPicker',
      gridItemProps: 12,
      componentProps: { showAlpha: false }
    },
    {
      field: 'isRemote',
      label: '支持远程办公',
      component: 'switch',
      gridItemProps: 12,
    },
    {
      field: 'resume',
      label: '简历附件',
      component: 'upload',
      gridItemProps: 24,
      componentProps: {
        max: 3,
        listType: 'image-card'
      }
    }
  ],
})

async function handleValidate() {
  try {
    await validate()
    message.success('校验通过，您提交的资料非常完整！')
  }
  catch (err) {
    message.error('校验不通过，请检查红框高亮区域')
  }
}
</script>

<template>
  <div class="page-wrapper">
    <div class="glass-card form-section">
      <div class="card-header">
        <div class="header-left">
          <div class="icon-box i-carbon:apps"></div>
          <div class="title-info">
            <h3>全系组件支持与自动推导</h3>
            <p>展示框架对各种复杂组件的原生接管，以及 <code>autoPlaceholder</code> 和 <code>autoRequiredRule</code> 的自动生成能力。</p>
          </div>
        </div>
        <div class="header-actions">
          <n-button secondary @click="resetFields">重置</n-button>
          <n-button type="primary" @click="handleValidate">提交资料</n-button>
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
