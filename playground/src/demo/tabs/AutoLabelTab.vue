<script setup lang="ts">
import { SchemaForm } from '../../../../src'
import { autoLabelModel, autoLabelSchema } from '../auto-label'
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    单独测试 autoLabelWidth 在 label-placement="left" 下的宽度测量与同步。
  </n-alert>
  <SchemaForm
    v-model:model="autoLabelModel"
    :schema="autoLabelSchema"
    label-placement="left"
    :auto-label-width="true"
    :show-actions="false"
    :grid-props="{ cols: 1, yGap: 8 }"
  />
</template>
