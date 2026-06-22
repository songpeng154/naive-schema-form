import type { ComputedRef } from 'vue'
import type { CallbackParams, DefineSchema, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import type { SchemaComponentPropsMap } from '@/components/schema-form/types/component.ts'
import type { Recordable } from '@/types/shared.ts'
import { isArray } from 'es-toolkit/compat'
import { computed, unref } from 'vue'
import { getSchemaComponentAdapter } from '@/components/schema-form/core/registry.ts'
import { generatePlaceholder } from '@/components/schema-form/core/rules.ts'
import { useLocale } from '@/components/schema-form/hooks/use-locale.ts'
import { resolveDynamicProp } from '@/components/schema-form/utils/resolve-dynamic.ts'

/**
 * 集中解析和组装底层 UI 组件所需要的动态 Props
 * @param schemaRef 表单项的 schema 定义
 * @param callbackParams 获取动态属性时注入的上下文参数
 * @param resolvedLabel 解析后的标签名
 * @param schemaFormProps 顶层容器的属性
 * @param globalComponentProps 全局组件默认属性
 */
export function useSchemaComponentProps(
  schemaRef: ComputedRef<DefineSchema>,
  callbackParams: ComputedRef<CallbackParams>,
  resolvedLabel: ComputedRef<any>,
  /**
   * SchemaForm 容器级的 Props
   */
  schemaFormProps: SchemaFormCommonProps,
  /**
   * 全局组件的默认属性配置表（用于跟局部 componentProps 合并）
   */
  globalComponentProps: Partial<SchemaComponentPropsMap>,
) {
  const localeName = useLocale()

  // 获取当前字段类型对应的 Naive UI 组件适配器
  const adapter = computed(() => {
    return getSchemaComponentAdapter(schemaRef.value.component)
  })

  // 解析出真实的渲染组件类型（如 NInput 等）
  const resolvedComponent = computed(() => {
    return adapter.value?.component
  })

  // 动态聚合与解析组件的 Props（集成全局默认值、自动 Placeholder、时间格式、禁用状态等联动属性）
  const resolvedComponentProps = computed(() => {
    const { component, componentProps, placeholder, startPlaceholder, endPlaceholder, options, disabled: itemDisabled } = schemaRef.value

    // 先合并全局组件默认值，使得 Schema 级别的属性可以覆盖它们。

    const defaults = component
      ? globalComponentProps[component] as Recordable | undefined
      : undefined

    const baseProps = { ...defaults, ...componentProps } as Recordable

    const mapProps: Recordable = {}
    const currentAdapter = adapter.value

    if (component && currentAdapter) {
      if (currentAdapter.actionType === 'date') {
        mapProps.format = schemaFormProps.defaultDateFormat
        mapProps.valueFormat = schemaFormProps.defaultDateValueFormat
      }

      if (currentAdapter.actionType === 'time') {
        mapProps.format = schemaFormProps.defaultTimeFormat
        mapProps.valueFormat = schemaFormProps.defaultTimeValueFormat
      }

      if (schemaFormProps.autoPlaceholder && currentAdapter.mapPlaceholder && typeof resolvedLabel.value === 'string') {
        const autoPlaceholder = generatePlaceholder(resolvedLabel.value, component, localeName.value, baseProps.type)
        if (isArray(autoPlaceholder)) {
          mapProps.startPlaceholder = autoPlaceholder[0]
          mapProps.endPlaceholder = autoPlaceholder[1]
        }
        else if (autoPlaceholder) {
          mapProps.placeholder = autoPlaceholder
        }
      }

      const unreffedPlaceholder = unref(placeholder)
      if (unreffedPlaceholder && currentAdapter.mapPlaceholder)
        mapProps.placeholder = unreffedPlaceholder

      if ((startPlaceholder || endPlaceholder) && currentAdapter.actionType === 'date' && baseProps.type?.includes?.('range')) {
        if (startPlaceholder)
          mapProps.startPlaceholder = startPlaceholder
        if (endPlaceholder)
          mapProps.endPlaceholder = endPlaceholder
      }

      const unreffedOptions = unref(options)
      if (unreffedOptions && currentAdapter.mapOptions)
        mapProps.options = unreffedOptions

      const resolvedDisabledVal = unref(itemDisabled)
      if (resolvedDisabledVal !== undefined || schemaFormProps.disabled !== undefined) {
        const resolvedItemDisabled = resolvedDisabledVal !== undefined
          ? resolveDynamicProp(itemDisabled, callbackParams.value)
          : undefined

        mapProps.disabled = resolvedItemDisabled ?? schemaFormProps.disabled
      }
    }

    return {
      ...mapProps,
      ...baseProps,
    }
  })

  // 检查 Schema 的基础组件配置是否存在逻辑矛盾（如不支持的时间选择类型等）
  const resolvedError = computed(() => {
    if (!schemaRef.value.component)
      return undefined

    const currentAdapter = adapter.value
    if (!currentAdapter)
      return `SchemaForm: unknown component "${String(schemaRef.value.component)}".`
    return undefined
  })

  return {
    adapter,
    resolvedComponent,
    resolvedComponentProps,
    resolvedError,
  }
}
