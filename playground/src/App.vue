<script setup lang="ts">
import { h, computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { 
  NConfigProvider, 
  NMessageProvider, 
  NDialogProvider,
  NMenu,
  zhCN,
  dateZhCN
} from 'naive-ui'
import type { MenuOption, GlobalThemeOverrides } from 'naive-ui'
import { router } from './router'

const route = useRoute()
const activeKey = computed(() => route.name as string)

// 按功能点正常分类菜单
const menuOptions = computed<MenuOption[]>(() => {
  const routes = router.getRoutes()
  
  const formChildren = routes
    .filter(r => r.meta.group === 'forms')
    .map(r => ({
      label: () => h(RouterLink, { to: r.path }, { default: () => r.meta.title }),
      key: r.name as string
    }))

  const featureChildren = routes
    .filter(r => r.meta.group === 'features')
    .map(r => ({
      label: () => h(RouterLink, { to: r.path }, { default: () => r.meta.title }),
      key: r.name as string
    }))

  return [
    {
      label: '核心表单 (Forms)',
      key: 'forms',
      children: formChildren
    },
    {
      label: '功能特性 (Features)',
      key: 'features',
      children: featureChildren
    }
  ]
})

// 定制高端 UI 主题
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColor: '#6366f1',
    primaryColorHover: '#818cf8',
    primaryColorPressed: '#4f46e5',
    primaryColorSuppl: '#6366f1',
    borderRadius: '4px',
  }
}
</script>

<template>
  <n-config-provider 
    :locale="zhCN" 
    :date-locale="dateZhCN" 
    :theme-overrides="themeOverrides"
  >
    <n-message-provider>
      <n-dialog-provider>
        <div class="app-container">
          <!-- 简洁的侧边栏 -->
          <aside class="sidebar">
            <div class="logo-container">
              <div class="logo-text">Naive Schema Form</div>
            </div>
            <n-menu
              :value="activeKey"
              :options="menuOptions"
              :indent="24"
              :default-expanded-keys="['forms', 'features']"
            />
          </aside>

          <!-- 主内容区 -->
          <main class="main-content">
            <header class="header">
              <div class="header-title">
                <span class="route-title">{{ route.meta.title || 'Playground' }}</span>
              </div>
            </header>

            <div class="viewport-container">
              <router-view v-slot="{ Component, route }">
                <transition name="fade-slide" mode="out-in">
                  <keep-alive>
                    <component :is="Component" :key="route.fullPath" />
                  </keep-alive>
                </transition>
              </router-view>
            </div>
          </main>
        </div>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
/* 全局基础重置 */
body, html {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  overflow: hidden;
}

/* 布局框架 */
.app-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f4f4f8;
  color: #333639;
}

/* 侧边栏 */
.sidebar {
  width: 240px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-right: 1px solid #efeff5;
  display: flex;
  flex-direction: column;
}

.logo-container {
  height: 60px;
  display: flex;
  align-items: center;
  padding: 0 24px;
  font-weight: bold;
  font-size: 16px;
  border-bottom: 1px solid #efeff5;
  color: #6366f1;
}

/* 主内容区 */
.main-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.header {
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
  background-color: #ffffff;
  border-bottom: 1px solid #efeff5;
}

.route-title {
  font-size: 18px;
  font-weight: 500;
}

.viewport-container {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  overflow-x: hidden;
}

/* 路由切换动效 */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.2s ease;
}

.fade-slide-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
