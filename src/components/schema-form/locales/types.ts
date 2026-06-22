import type { RulePresets } from '@/components/schema-form/types/common.ts'

/**
 * 国际化预设规则消息类型
 */
export type LocaleRulePresets = Record<RulePresets, {
  requiredMessage: string
  incorrectMessage: string
}>

/**
 * 表单国际化配置结构
 */
export interface SchemaFormLocale {
  name: string
  placeholder: {
    input: (label: string) => string
    select: (label: string) => string
    dateRange: [string, string]
    dateTimeRange: [string, string]
  }
  rule: {
    required: (label: string) => string
  }
  rulePresets: LocaleRulePresets
}
