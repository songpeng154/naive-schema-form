import type { ComputedRef } from 'vue'
import type { CallbackParams, DefineSchema, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import { computed, unref } from 'vue'
import { generateRule, handleRulePresets } from '@/components/schema-form/core/rules.ts'
import { resolveDynamicProp } from '@/components/schema-form/utils/resolve-dynamic.ts'

export function useSchemaRules(
  schema: DefineSchema,
  resolvedLabel: ComputedRef<any>,
  resolvedComponent: ComputedRef<any>,
  callbackParams: ComputedRef<CallbackParams>,
  schemaFormProps: SchemaFormCommonProps,
) {
  // 动态解析并配置当前表单项校验规则
  // 优先级：用户自定义规则 > 预设字符串规则 > 语义化 required 自动生成规则
  const resolvedRules = computed(() => {
    const rules = unref(schema.rules)

    // 1. 用户写了自定义规则对象/数组，直接使用
    if (rules && typeof rules !== 'string')
      return rules

    // 2. 用户写了预设规则字符串（如 'mail'/'phone'）
    if (typeof rules === 'string')
      return handleRulePresets(rules)

    // 3. 解析语义化必填 required
    const isRequired = schema.required !== undefined
      ? resolveDynamicProp(schema.required, callbackParams.value)
      : false

    // 4. 根据 required 状态生成规则
    if (isRequired) {
      /**
       * 自动必填规则满足条件：
       * 1.必须开启自动必填规则
       * 2.组件必须存在
       * 3.label 必须是字符串，用于生成校验信息
       */
      if (schemaFormProps.autoRequiredRule && resolvedComponent.value && typeof resolvedLabel.value === 'string') {
        // 自动生成带有友好提示的校验规则
        return generateRule(resolvedLabel.value as string, schema.component!)
      }
      // 降级使用基础必填标记
      return { required: true }
    }

    return undefined
  })

  return {
    resolvedRules,
  }
}
