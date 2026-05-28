<script setup lang="ts">
import { ref } from 'vue'
import AutoLabelTab from './demo/tabs/AutoLabelTab.vue'
import BaseTab from './demo/tabs/BaseTab.vue'
import ComponentsTab from './demo/tabs/ComponentsTab.vue'
import DynamicTab from './demo/tabs/DynamicTab.vue'
import GroupTab from './demo/tabs/GroupTab.vue'
import PopupTab from './demo/tabs/PopupTab.vue'
import SearchTab from './demo/tabs/SearchTab.vue'
import SnapshotsTab from './demo/tabs/SnapshotsTab.vue'
import ValidationTab from './demo/tabs/ValidationTab.vue'

const baseTabRef = ref<InstanceType<typeof BaseTab>>()
</script>

<template>
  <main class="playground-shell">
    <section class="hero-panel">
      <div>
        <p class="eyebrow">
          Naive Schema Form
        </p>
        <h1>独立库 Playground</h1>
        <p class="hero-copy">
          用 Tabs 拆开核心场景：组件总览、动态能力、校验规则、搜索折叠、分组折叠、弹窗和数据快照。
        </p>
      </div>
      <div class="hero-actions">
        <n-button type="primary" size="large" @click="baseTabRef?.validate()">
          校验基础表单
        </n-button>
        <n-button size="large" @click="baseTabRef?.scrollToEmail()">
          滚动到邮箱
        </n-button>
        <n-button size="large" @click="baseTabRef?.addRuntimeKey()">
          写入 runtimeOnly
        </n-button>
      </div>
    </section>

    <n-card class="tabs-card" :bordered="false">
      <n-tabs type="segment" animated pane-class="tab-pane">
        <n-tab-pane name="base" tab="基础表单">
          <BaseTab ref="baseTabRef" />
        </n-tab-pane>
        <n-tab-pane name="components" tab="组件总览">
          <ComponentsTab />
        </n-tab-pane>
        <n-tab-pane name="dynamic" tab="动态能力">
          <DynamicTab />
        </n-tab-pane>
        <n-tab-pane name="validation" tab="校验规则">
          <ValidationTab />
        </n-tab-pane>
        <n-tab-pane name="search" tab="搜索表单">
          <SearchTab />
        </n-tab-pane>
        <n-tab-pane name="group" tab="分组表单">
          <GroupTab />
        </n-tab-pane>
        <n-tab-pane name="popup" tab="弹窗表单">
          <PopupTab />
        </n-tab-pane>
        <n-tab-pane name="auto-label" tab="自动标签宽度">
          <AutoLabelTab />
        </n-tab-pane>
        <n-tab-pane name="snapshots" tab="数据快照">
          <SnapshotsTab />
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </main>
</template>
