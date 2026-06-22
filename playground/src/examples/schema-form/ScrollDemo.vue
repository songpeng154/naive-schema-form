<script setup lang="ts">
import { SchemaForm, useSchemaForm } from 'naive-schema-form'
import { NButton, NSpace, useMessage, NCard } from 'naive-ui'
import { ref } from 'vue'

const message = useMessage()

// 制造大量数据字段
const model = ref(
  Array.from({ length: 30 }).reduce((acc, _, i) => {
    acc[`field${i + 1}`] = ''
    return acc
  }, {} as Record<string, string>)
)

const { register, validate } = useSchemaForm(model, {
  labelWidth: 100,
  autoRequiredRule: true,
  // 故意给前几个和后几个加必填，模拟真实的超长表单场景
  schema: Array.from({ length: 30 }).map((_, i) => ({
    field: `field${i + 1}`,
    label: `超长表单字段 ${i + 1}`,
    component: 'input',
    required: i === 5 || i === 15 || i === 25, // 让第 6、16、26 个字段必填
    placeholder: `输入测试数据 ${i + 1}`,
  })),
})

async function handleSubmit() {
  try {
    await validate()
    message.success('全部校验通过！')
  } catch (e) {
    message.error('校验未通过，已自动平滑滚动到第一个错误字段')
  }
}
</script>

<template>
  <!-- 模拟一个类似于 VitePress 的固定导航栏（遮挡物） -->
  <div style="position: fixed; top: 54px; left: 260px; right: 0; height: 80px; background: rgba(255, 0, 0, 0.8); color: white; z-index: 999; display: flex; align-items: center; justify-content: center; font-weight: bold; font-size: 20px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); backdrop-filter: blur(8px); pointer-events: none;">
    我是模拟的顶部巨型固定遮挡栏 (高度 80px)
  </div>

  <div style="padding: 24px; max-width: 800px; margin: 0 auto; margin-top: 100px;">
    <NCard title="全局滚动测试（超长表单）" style="margin-bottom: 24px">
      <div style="color: #666; font-size: 14px; margin-bottom: 16px;">
        测试说明：往下滚动到页面底部点击提交，观察浏览器是否能完美滚动（block: 'nearest'）到 <strong>字段 6</strong> 的位置。
      </div>
    </NCard>

    <div style="background: white; padding: 24px; border-radius: 8px;">
      <SchemaForm v-bind="register" />
      
      <NSpace style="margin-top: 40px; padding-top: 24px; border-top: 1px solid #eee;">
        <NButton type="primary" size="large" @click="handleSubmit">
          在页面最底部点击提交（触发校验拦截）
        </NButton>
      </NSpace>
    </div>
  </div>
</template>
