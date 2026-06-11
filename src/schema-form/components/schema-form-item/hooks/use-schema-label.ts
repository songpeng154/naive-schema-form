import type { ComputedRef, Ref } from 'vue'
import type { SchemaFormItemProps } from '@/schema-form/components/schema-form-item/types/type'
import type { CallbackParams } from '@/schema-form/types/common'
import { isNumber } from 'es-toolkit/compat'
import { computed, nextTick, unref, watch } from 'vue'
import { useSchemaFormContext } from '@/schema-form/hooks/context'
import { resolveDynamicProp } from '@/schema-form/utils/resolve-dynamic'

/**
 * 自动计算并管理表单项标签宽度的 Composition Hook
 * 监听 DOM 状态、配置开关及 Label 内容的变化，以在 Label 节点重建时重新绑定 ResizeObserver。
 */
export function useSchemaLabel(
  props: SchemaFormItemProps,
  callbackParams: ComputedRef<CallbackParams>,
  isVisible: ComputedRef<boolean>,
  itemEl: Ref<HTMLElement | null | undefined>,
  schemaFormProps: any,
  uniqueIdentifier: ComputedRef<string>,
) {
  const { formItemData, setFormItemData } = useSchemaFormContext()!

  // 最大 label宽度
  const maxLabelWidth = computed(() => {
    const widths = Object.entries(formItemData)
      .map(([, value]) => value.labelWidth)
      .filter(value => isNumber(value) && value > 0) as number[]
    console.log(widths.length ? Math.max(...widths) : 0)
    return widths.length ? Math.max(...widths) : 0
  })

  // 动态解析表单项标题 Label（支持字符串、插槽内容或回调函数）
  const resolvedLabel = computed(() => {
    if (!props.schema.label)
      return undefined
    return resolveDynamicProp(props.schema.label, callbackParams.value)
  })

  // 自动计算表单项 Label 的宽度，以实现全局 Label 自适应等宽排列
  const labelWidth = computed(() => {
    const rawLabelWidth = unref(props.schema.formItemProps?.labelWidth)
    if (rawLabelWidth)
      return rawLabelWidth
    if (schemaFormProps.labelWidth)
      return schemaFormProps.labelWidth

    return schemaFormProps.autoLabelWidth && maxLabelWidth.value && schemaFormProps.labelPlacement !== 'top' ? `${maxLabelWidth.value}px` : undefined
  })

  // 判断当前表单项是否需要参与 Label 宽度的实时测量计算
  const shouldMeasureLabel = computed(() => Boolean(
    resolvedLabel.value
    && schemaFormProps.autoLabelWidth
    && schemaFormProps.labelPlacement !== 'top'
    && isVisible.value
    && !unref(props.schema.formItemProps?.labelWidth)
    && !schemaFormProps.labelWidth,
  ))

  // 监听 DOM 元素、配置开关。
  watch([shouldMeasureLabel, itemEl, resolvedLabel], async () => {
    await nextTick()
    if (!itemEl.value || !shouldMeasureLabel.value)
      return

    console.log(itemEl.value)

    const label = itemEl.value.querySelector<HTMLElement>('.n-form-item-label')

    if (!label)
      return

    // 1. 备份现有样式
    const originalWidth = label.style.width
    const originalWhiteSpace = label.style.whiteSpace
    // 2. 强行解除限制，让内容在一行内完全展开
    label.style.width = 'max-content' // 或者 'auto'
    label.style.whiteSpace = 'nowrap'
    // 3. 读取真实的、未被折叠的宽度
    const actualWidth = label.scrollWidth // 或者是 el.getBoundingClientRect().width
    // 4. 恢复原样
    label.style.width = originalWidth
    label.style.whiteSpace = originalWhiteSpace

    setFormItemData(uniqueIdentifier.value, {
      el: itemEl.value,
      field: unref(props.schema.field),
      labelWidth: actualWidth + 10,
    })
    console.log(formItemData)
  })

  return {
    resolvedLabel,
    labelWidth,
  }
}
