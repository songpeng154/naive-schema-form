<script setup lang="ts">
import { PopupSchemaForm } from '../../../../src'
import { modalVisible, popupModel, popupSchema, popupVisible } from '../popup'
import { message } from '../message'

function handleFinish(label: string) {
  message.success(`${label} 校验通过`)
  console.log(label, popupModel)
}
</script>

<template>
  <n-alert class="tab-intro" type="default" :bordered="false">
    测试 Drawer / Modal 两种弹窗形态、header / formBefore / footer slots 和关闭重置策略。
  </n-alert>
  <n-space>
    <n-button type="primary" @click="popupVisible = true">
      打开 Drawer
    </n-button>
    <n-button @click="modalVisible = true">
      打开 Modal
    </n-button>
  </n-space>

  <PopupSchemaForm
    v-model:model="popupModel"
    :schema="popupSchema"
    v-model:visible="popupVisible"
    title="Drawer 编辑"
    type="drawer"
    width="560px"
    :confirm-on-close="false"
    @finish="handleFinish('Drawer')"
  >
    <template #header>
      <span>自定义 Header：Drawer 编辑</span>
    </template>
    <template #formBefore>
      <n-alert type="info" :bordered="false">
        formBefore slot：这里可以放业务说明。
      </n-alert>
    </template>
  </PopupSchemaForm>

  <PopupSchemaForm
    v-model:model="popupModel"
    :schema="popupSchema"
    v-model:visible="modalVisible"
    title="Modal 编辑"
    type="modal"
    width="760px"
    :reset-on-close="false"
    :confirm-on-close="false"
    @finish="handleFinish('Modal')"
  >
    <template #footer>
      <n-space justify="end">
        <n-button @click="modalVisible = false">
          只关闭
        </n-button>
        <n-button type="primary" @click="message.success('footer slot')">
          自定义 Footer
        </n-button>
      </n-space>
    </template>
  </PopupSchemaForm>
</template>


