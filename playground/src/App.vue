<script setup lang="ts">
import { dateZhCN, dateEnUS, NButton, NConfigProvider, NDialogProvider, NLayout, NLayoutContent, NLayoutHeader, NLayoutSider, NMenu, NMessageProvider, zhCN, enUS } from 'naive-ui'
import { computed, h, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
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
    PopupSchemaForm: '弹窗表单',
  }

  return groups.map((groupName) => {
    const children = routes
      .filter(r => r.meta.group === groupName)
      .map(r => ({
        label: () => h(RouterLink, { to: r.path }, { default: () => r.meta.title }),
        key: r.name as string,
      }))

    return {
      label: groupTitles[groupName] || groupName,
      key: groupName,
      children: children.length > 0 ? children : [{ label: '开发中...', key: `${groupName}-wip`, disabled: true }],
    }
  })
})

const currentLocale = ref<'zhCN' | 'enUS'>('zhCN')
const toggleLocale = () => {
  currentLocale.value = currentLocale.value === 'zhCN' ? 'enUS' : 'zhCN'
}

const locale = computed(() => currentLocale.value === 'zhCN' ? zhCN : enUS)
const dateLocale = computed(() => currentLocale.value === 'zhCN' ? dateZhCN : dateEnUS)
</script>

<template>
  <NConfigProvider :locale="locale" :date-locale="dateLocale">
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
            <NLayoutHeader bordered style="height: 54px; padding: 0 24px; display: flex; align-items: center; justify-content: space-between; font-size: 16px; font-weight: 500;">
              <div>{{ route.meta.title || 'Playground' }}</div>
              <NButton size="small" @click="toggleLocale">切换语言: {{ currentLocale === 'zhCN' ? '中文' : 'English' }}</NButton>
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
