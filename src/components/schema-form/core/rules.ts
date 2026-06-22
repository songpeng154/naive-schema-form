import type { FormItemRule } from 'naive-ui'
import type { RulePresets, Schema } from '@/components/schema-form/types/common.ts'
import { isString } from 'es-toolkit'
import { isArray } from 'es-toolkit/compat'
import { getSchemaComponentAdapter } from '@/components/schema-form/core/registry.ts'
import { getLocale } from '@/components/schema-form/locales/index.ts'
import RegUtils from '@/utils/reg.ts'

/**
 * 规则验证器逻辑预设
 */
const presetsValidators: Record<RulePresets, (value: string) => boolean> = {
  mail: (value: string) => RegUtils.MATCH_EMAIL.test(value),
  phone: (value: string) => RegUtils.MATCH_PHONE.test(value),
  landline: (value: string) => RegUtils.MATCH_LANDLINE.test(value),
  idCard: (value: string) => RegUtils.MATCH_ID_CARD.test(value),
  url: (value: string) => RegUtils.MATCH_URL.test(value),
}

/**
 * 根据组件类型和国际化配置生成对应的 placeholder (如 "请输入 xxx", "请选择 xxx")
 * @param label 字段的文本标签
 * @param component 组件名称
 * @param localeName 语言区域名称
 * @param type 组件内部的具体类型（如 daterange）
 */
export function generatePlaceholder(label: Schema['label'], component: string, localeName: string, type?: string) {
  const adapter = getSchemaComponentAdapter(component)
  const actionType = adapter?.actionType || 'default'
  const locale = getLocale(localeName)
  const l = isString(label) ? label : ''

  if (actionType === 'date' && type?.includes('range')) {
    return type === 'datetimerange' ? locale.placeholder.dateTimeRange : locale.placeholder.dateRange
  }

  if (actionType === 'input')
    return locale.placeholder.input(l)

  if (actionType === 'select')
    return locale.placeholder.select(l)

  return undefined
}

/**
 * 为表单项生成基础必填校验规则
 * @param label 字段的文本标签
 * @param component 组件名称
 * @param localeName 语言区域名称
 */
export function generateRule(label: string, component: string, localeName: string): FormItemRule {
  const adapter = getSchemaComponentAdapter(component)
  const actionType = adapter?.actionType || 'default'
  const locale = getLocale(localeName)
  const l = isString(label) ? label : ''

  let message = locale.rule.required(l)

  if (actionType === 'input')
    message = locale.placeholder.input(l)
  else if (actionType === 'select')
    message = locale.placeholder.select(l)

  return {
    required: true,
    validator(_rule: FormItemRule, value: any) {
      const isEmpty = value === null
        || value === undefined
        || value === ''
        || (isArray(value) && value.length === 0)
      return isEmpty ? Promise.reject(message) : Promise.resolve()
    },
    trigger: actionType === 'input' ? 'blur' : 'change',
  }
}

/**
 * 处理内置的预设校验规则（如邮箱、手机号等）
 * @param rule 预设规则的名称
 * @param localeName 语言区域名称
 */
export function handleRulePresets(rule: RulePresets, localeName: string): FormItemRule {
  return {
    required: true,
    validator(_rule: FormItemRule, value: string) {
      const locale = getLocale(localeName)
      const { requiredMessage, incorrectMessage } = locale.rulePresets[rule]
      const validator = presetsValidators[rule]

      if (!value)
        return Promise.reject(requiredMessage)
      if (!validator(value))
        return Promise.reject(incorrectMessage)
      return Promise.resolve()
    },
    trigger: 'blur',
  }
}
