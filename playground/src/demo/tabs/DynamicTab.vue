<script setup lang="ts">
import { SchemaForm } from '../../../../src'
import { dynamicModel, dynamicSchema, showExtraField } from '../dynamic'
import { message } from '../message'

function handleFinish() {
  message.success('动态表单校验通过')
  console.log('动态表单', dynamicModel)
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    覆盖 hide 回调、disabled 回调、动态 label、tooltip、itemSlot、formItemSlot 和运行时切换字段。
  </n-alert>
  <n-space class="tab-toolbar">
    <n-button @click="dynamicModel.mode = dynamicModel.mode === 'company' ? 'personal' : 'company'">
      切换个人/企业
    </n-button>
    <n-button @click="dynamicModel.locked = !dynamicModel.locked">
      {{ dynamicModel.locked ? '解除锁定' : '锁定字段' }}
    </n-button>
    <n-button @click="showExtraField = !showExtraField">
      {{ showExtraField ? '隐藏运行时字段' : '显示运行时字段' }}
    </n-button>
  </n-space>
  <SchemaForm
    v-model:model="dynamicModel"
    :schema="dynamicSchema"
    label-placement="left"
    label-align="right"
    :grid-props="{ cols: 24, xGap: 16, yGap: 12 }"
    @finish="handleFinish"
  >
    <template #customBlock>
      <div class="slot-card">
        <strong>整项插槽</strong>
        <span>当前模式：{{ dynamicModel.mode }}；锁定状态：{{ dynamicModel.locked ? '已锁定' : '可编辑' }}</span>
      </div>
    </template>
    <template #roleSummary>
      <n-alert type="info" :bordered="false">
        formItemSlot：当前角色是 {{ dynamicModel.role || '未选择' }}
      </n-alert>
    </template>
  </SchemaForm>
</template>
