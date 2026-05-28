<script setup lang="ts">
import { SchemaForm } from '../../../../src'
import { componentsModel, componentsSchema } from '../components'
import { message } from '../message'

function handleFinish() {
  message.success('组件总览校验通过')
  console.log('组件总览', componentsModel)
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    覆盖内置 registry 组件：input/select/cascader/treeSelect/date/time/rate/slider/dynamicTags/transfer/upload 等。
  </n-alert>
  <SchemaForm
    v-model:model="componentsModel"
    :schema="componentsSchema"
    label-placement="left"
    label-align="right"
    :grid-props="{ cols: 24, xGap: 16, yGap: 12 }"
    @finish="handleFinish"
  />
</template>
