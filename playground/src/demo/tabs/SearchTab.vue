<script setup lang="ts">
import type { SearchSchemaFormExpose } from '../../../../src'
import { ref } from 'vue'
import { SearchSchemaForm } from '../../../../src'
import { searchModel, searchSchema } from '../search'
import { message } from '../message'

const formRef = ref<SearchSchemaFormExpose>()

function handleFinish() {
  message.success('搜索表单校验通过')
  console.log('搜索表单', searchModel)
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    测试搜索表单默认折叠、展开/收起按钮、强制折叠控制和 responsive grid。
  </n-alert>
  <SearchSchemaForm
    ref="formRef"
    v-model:model="searchModel"
    :schema="searchSchema"
    :search-show-number="3"
    :grid-props="{ cols: 24, xGap: 12, yGap: 10, responsive: 'self' }"
    @finish="handleFinish"
  >
    <template #actionsAfter>
      <n-button tertiary @click="formRef?.toggleCollapsed(false)">
        强制展开
      </n-button>
      <n-button tertiary @click="formRef?.toggleCollapsed(true)">
        强制折叠
      </n-button>
    </template>
  </SearchSchemaForm>
</template>


