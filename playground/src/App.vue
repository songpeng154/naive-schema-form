<script setup lang="ts">
import { computed, h } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { NConfigProvider, NMessageProvider, NDialogProvider, NMenu, zhCN, dateZhCN, NLayout, NLayoutSider, NLayoutHeader, NLayoutContent } from 'naive-ui'
import { router } from './router'

const route = useRoute()
const activeKey = computed(() => route.name as string)

const menuOptions = computed(() => {
  const routes = router.getRoutes().filter(r => r.meta && r.meta.group)
  
  const groups = ['SchemaForm', 'SearchSchemaForm', 'GroupSchemaForm', 'PopupSchemaForm']
  const groupTitles: Record<string, string> = {
    SchemaForm: '基础表单',
    SearchSchemaForm: '查询表单',
    GroupSchemaForm: '分组表单',
    PopupSchemaForm: '弹窗表单'
  }
  
  return groups.map(groupName => {
    const children = routes
      .filter(r => r.meta.group === groupName)
      .map(r => ({
        label: () => h(RouterLink, { to: r.path }, { default: () => r.meta.title }),
        key: r.name as string,
      }))
    
    return {
      label: groupTitles[groupName] || groupName,
      key: groupName,
      children: children.length > 0 ? children : [{ label: '开发中...', key: `${groupName}-wip`, disabled: true }]
    }
  })
})
</script>

<template>
  <NConfigProvider :locale="zhCN" :date-locale="dateZhCN">
    <NMessageProvider>
      <NDialogProvider>
        <NLayout has-sider style="height: 100vh">
          <NLayoutSider
            bordered
            collapse-mode="width"
            :collapsed-width="64"
            :width="260"
            show-trigger
          >
            <div style="padding: 16px; font-weight: bold; border-bottom: 1px solid var(--n-border-color)">
              Playground Sandbox
            </div>
            <NMenu
              :value="activeKey"
              :options="menuOptions"
              :default-expanded-keys="['SchemaForm', 'SearchSchemaForm', 'GroupSchemaForm', 'PopupSchemaForm']"
            />
          </NLayoutSider>
          
          <NLayout>
            <NLayoutHeader bordered style="height: 54px; padding: 0 24px; display: flex; align-items: center; font-size: 16px; font-weight: 500;">
              {{ route.meta.title || 'Playground' }}
            </NLayoutHeader>
            <NLayoutContent style="padding: 24px; background: #f4f4f8;">
              <router-view v-slot="{ Component }">
                <component :is="Component" />
              </router-view>
            </NLayoutContent>
          </NLayout>
        </NLayout>
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>

<style>
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: system-ui, -apple-system, sans-serif;
}
</style>
