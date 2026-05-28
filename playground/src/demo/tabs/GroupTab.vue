<script setup lang="ts">
import type { GroupSchemaFormExpose } from '../../../../src'
import { ref } from 'vue'
import { GroupSchemaForm } from '../../../../src'
import { groupModel, groupSchema } from '../group'
import { message } from '../message'

const formRef = ref<GroupSchemaFormExpose>()

function handleFinish() {
  message.success('分组表单校验通过')
  console.log('分组表单', groupModel)
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    在“项目名”输入 hide，可隐藏高级配置分组；分组按钮只有内容溢出时显示。
  </n-alert>
  <GroupSchemaForm
    ref="formRef"
    v-model:model="groupModel"
    :schema="groupSchema"
    label-placement="left"
    :grid-props="{ cols: 24, xGap: 16, yGap: 12 }"
    @finish="handleFinish"
  >
    <template #groupTitle="{ config }">
      <div class="group-title-slot">
        <span />
        <strong>{{ config.title }}</strong>
        <small>{{ config.form.length }} items</small>
      </div>
    </template>
    <template #collapsedButton="{ config, toggleCollapsed, overflow }">
      <n-button quaternary type="primary" :disabled="!overflow" @click="toggleCollapsed(config)">
        {{ config.collapsed ? '展开本组' : '收起本组' }}
      </n-button>
    </template>
    <template #actionsAfter>
      <n-button tertiary @click="formRef?.toggleCollapsed(0, false)">
        展开第一组
      </n-button>
    </template>
  </GroupSchemaForm>
</template>


