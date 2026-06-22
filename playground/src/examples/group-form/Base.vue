<script setup lang="ts">
import { NButton } from 'naive-ui'
import { ref } from 'vue'
import { GroupSchemaForm, useGroupSchemaForm } from '../../../../src/index'

const model = ref<Record<string, any>>({
  username: '',
  password: '',
  profile: '',
  city: null,
  company: '',
})

// 动态开关，用来演示 disabled 和 gridItemProps 自动继承
const isGroupDisabled = ref(false)
const groupCols = ref(12)

const { register } = useGroupSchemaForm(model, {
  schema: [
    {
      title: '基础信息 (无特殊配置)',
      helpMessage: '这是用户的基本登录信息',
      form: [
        { field: 'username', label: '用户名', component: 'input' },
        { field: 'password', label: '密码', component: 'input', componentProps: { type: 'password' } },
      ],
    },
    {
      title: '详细资料 (测试 disabled & gridItemProps 动态继承)',
      collapsed: false,
      disabled: isGroupDisabled, // 绑定外部 ref
      gridItemProps: groupCols, // 绑定外部 ref
      form: [
        { field: 'profile', label: '个人简介', component: 'input', componentProps: { type: 'textarea' } },
        { field: 'city', label: '所在城市', component: 'select', options: [{ label: '北京', value: 'bj' }, { label: '上海', value: 'sh' }] },
        // 测试子项覆盖优先级 (强制不受分组影响)
        { field: 'company', label: '就职公司 (强制可用 & 独占一行)', component: 'input', disabled: false, gridItemProps: 24 },
      ],
    },
  ] as any,
})
</script>

<template>
  <div style="margin-bottom: 24px; display: flex; gap: 12px;">
    <NButton type="primary" @click="isGroupDisabled = !isGroupDisabled">
      Toggle 详细资料禁用状态 (当前: {{ isGroupDisabled }})
    </NButton>
    <NButton type="info" @click="groupCols = groupCols === 12 ? 8 : 12">
      Toggle 详细资料列宽 (当前: {{ groupCols }})
    </NButton>
  </div>

  <div style="display: flex; gap: 24px;">
    <!-- 左侧：渲染组件 -->
    <div style="flex: 1; background: #fff; padding: 24px; border-radius: 8px; box-shadow: 0 1px 4px rgba(0,0,0,0.05);">
      <GroupSchemaForm v-bind="register" />
    </div>

    <!-- 右侧：实时输出内部 model 状态 -->
    <div style="width: 350px; background: #282c34; color: #abb2bf; padding: 20px; border-radius: 8px; overflow-y: auto;">
      <h3 style="margin-top: 0; color: #e5c07b; font-size: 14px;">
        Current Model:
      </h3>
      <pre style="margin: 0; font-family: monospace; font-size: 13px;">{{ JSON.stringify(model, null, 2) }}</pre>
    </div>
  </div>
</template>
