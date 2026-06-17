import type { ComputedRef } from 'vue'
import type { NLocale } from 'naive-ui'
import { computed, inject } from 'vue'

export interface ConfigProviderInjection {
  mergedLocaleRef?: ComputedRef<NLocale | undefined>
}

/**
 * 魔法嗅探：原生注入获取 Naive UI Locale
 * 无缝继承外层 <n-config-provider> 的语言上下文，无需任何额外配置
 */
export function useLocale() {
  const configProvider = inject<ConfigProviderInjection | null>('n-config-provider', null)
  return computed(() => configProvider?.mergedLocaleRef?.value?.name || 'zh-CN')
}
