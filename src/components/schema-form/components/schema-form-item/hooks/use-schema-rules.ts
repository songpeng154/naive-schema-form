import type { ComputedRef } from 'vue'
import type { CallbackParams, DefineSchema, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import { computed, unref } from 'vue'
import { generateRule, handleRulePresets } from '@/components/schema-form/core/rules.ts'
import { resolveDynamicProp } from '@/components/schema-form/utils/resolve-dynamic.ts'
import { useLocale } from '@/components/schema-form/hooks/use-locale.ts'

/**
 * 解析表单字段的验证规则
 * 处理优先级：用户自定义规则 > 预设规则字符串 > required 隐式生成的必填规则
 * @param schemaRef 表单项的 schema 定义
 * @param resolvedLabel 解析后的标签名，用于生成友好的校验文案
 * @param resolvedComponent 真实的 UI 渲染组件，用于判断默认触发时机
 * @param callbackParams 动态执行时需要的参数上下文
 * @param schemaFormProps 顶层容器的属性配置
 */
export function useSchemaRules(
  schemaRef: ComputedRef<DefineSchema>,
  resolvedLabel: ComputedRef<any>,
  resolvedComponent: ComputedRef<any>,
  callbackParams: ComputedRef<CallbackParams>,
  schemaFormProps: SchemaFormCommonProps,
) {
  const localeName = useLocale()

  // 动态解析并配置当前表单项校验规则
  // 优先级：用户自定义规则 > 预设字符串规则 > 语义化 required 自动生成规则
  const resolvedRules = computed(() => {
    const rules = unref(schemaRef.value.rules)

    // 1. 用户写了自定义规则对象/数组，直接使用
    if (rules && typeof rules !== 'string')
      return rules

    // 2. 用户写了预设规则字符串（如 'mail'/'phone'）
    if (typeof rules === 'string')
      return handleRulePresets(rules, localeName.value)

    // 3. 解析语义化必填 required
    const isRequired = schemaRef.value.required !== undefined
      ? resolveDynamicProp(schemaRef.value.required, callbackParams.value)
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
        return generateRule(resolvedLabel.value as string, schemaRef.value.component!, localeName.value)
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
