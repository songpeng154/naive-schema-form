<script setup lang="ts">
import { computed } from 'vue'
import { componentsModel } from '../components'
import { dynamicModel } from '../dynamic'
import { baseModel } from '../base'
import { groupModel } from '../group'
import { popupModel } from '../popup'
import { searchModel } from '../search'
import { validationModel } from '../validation'

const snapshots = computed(() => [
  { title: '基础表单', data: baseModel },
  { title: '组件总览', data: componentsModel },
  { title: '动态能力', data: dynamicModel },
  { title: '校验规则', data: validationModel },
  { title: '搜索表单', data: searchModel },
  { title: '分组表单', data: groupModel },
  { title: '弹窗表单', data: popupModel },
])

function stringify(value: unknown) {
  return JSON.stringify(value, null, 2)
}
</script>

<template>
  <n-grid :cols="4" :x-gap="12" :y-gap="12" responsive="screen">
    <n-grid-item v-for="item in snapshots" :key="item.title" :span="1">
      <div class="snapshot">
        <h3>{{ item.title }}</h3>
        <pre>{{ stringify(item.data) }}</pre>
      </div>
    </n-grid-item>
  </n-grid>
</template>

