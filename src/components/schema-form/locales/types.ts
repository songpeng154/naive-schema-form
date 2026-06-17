import type { RulePresets } from '@/components/schema-form/types/common.ts'

export type LocaleRulePresets = Record<RulePresets, {
  requiredMessage: string
  incorrectMessage: string
}>

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
