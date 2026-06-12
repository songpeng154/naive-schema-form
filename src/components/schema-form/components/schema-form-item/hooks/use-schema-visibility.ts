import type { ComputedRef } from 'vue'
import type { SchemaFormItemProps } from '@/components/schema-form/components/schema-form-item/types/type.ts'
import type { CallbackParams } from '@/components/schema-form/types/common.ts'
import { computed, unref } from 'vue'
import { resolveDynamicProp } from '@/components/schema-form/utils/resolve-dynamic.ts'

export function useSchemaVisibility(
  props: SchemaFormItemProps,
  callbackParams: ComputedRef<CallbackParams>,
) {
  // 控制当前字段组件的显示/隐藏（支持布尔值或联动回调函数）
  const isVisible = computed(() => {
    const hide = unref(props.schema.hide)
    if (hide === undefined)
      return true
    return !resolveDynamicProp(hide, callbackParams.value)
  })

  return {
    isVisible,
  }
}
