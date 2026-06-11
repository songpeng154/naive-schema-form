import type { Ref } from 'vue'
import type { GridItemProps } from '@/grid/types'
import type { SchemaFormItemProps } from '@/schema-form/components/schema-form-item/types/type'
import type { CallbackParams } from '@/schema-form/types/common'
import { isNumber } from 'es-toolkit/compat'
import { computed, onBeforeMount, unref, useId } from 'vue'
import { useSchemaFormContext } from '@/schema-form/hooks/context'
import { unrefObject } from '@/schema-form/utils/resolve-dynamic'
import { useSchemaComponentProps } from './use-schema-component-props'
import { useSchemaLabel } from './use-schema-label'
import { useSchemaRules } from './use-schema-rules'
import { useSchemaVisibility } from './use-schema-visibility'

export function useSchemaItem(
  props: SchemaFormItemProps,
  itemEl: Ref<HTMLElement | undefined>,
) {
  const { getModelValue, schemaFormProps, globalComponentProps, model, setFormItemData } = useSchemaFormContext()!
  const id = useId()
  // 唯一标识
  const uniqueIdentifier = computed(() => `${props.id}-${id}`)

  // 回调函数所需的参数封装（传入 model, 当前字段值与字段名）
  const callbackParams = computed(() => {
    const field = unref(props.schema.field)
    return {
      model: model.value,
      value: field ? getModelValue(field) : undefined,
      field,
    } as CallbackParams
  })

  // 获取当前栅格项的布局配置
  const gridItemPropsMap = computed(() => {
    const item = unref(props.schema.gridItemProps) ?? props.gridItemProps ?? schemaFormProps.gridItemProps
    return (isNumber(item) ? { span: item } : item || {}) as GridItemProps
  })

  // 解析需要真正传给 NFormItem 包装容器的 props（通过 schema.formItemProps 传入）
  const resolvedFormItemProps = computed(() => unrefObject(props.schema.formItemProps))

  // 组件显示/隐藏逻辑
  const { isVisible } = useSchemaVisibility(props, callbackParams)

  // 解析标题内容并负责 DOM 自动宽度测量
  const { resolvedLabel, labelWidth } = useSchemaLabel(
    props,
    callbackParams,
    isVisible,
    itemEl,
    schemaFormProps,
    uniqueIdentifier,
  )

  // 解析和组装真正传给底层 UI 控件的 Props
  const { adapter, resolvedComponent, resolvedComponentProps, resolvedError } = useSchemaComponentProps(
    props.schema,
    props,
    callbackParams,
    resolvedLabel,
    schemaFormProps,
    globalComponentProps,
  )

  // 解析表单校验规则（支持预设与 semantics required）
  const { resolvedRules } = useSchemaRules(
    props.schema,
    resolvedLabel,
    resolvedComponent,
    callbackParams,
    schemaFormProps,
  )

  const setFormItemFiled = (uniqueIdentifier?: string) => {
    if (!uniqueIdentifier)
      return
    setFormItemData(uniqueIdentifier, {
      field: unref(props.schema.field),
    })
  }

  onBeforeMount(() => {
    setFormItemFiled()
  })

  return {
    uniqueIdentifier,
    callbackParams,
    isVisible,
    gridItemPropsMap,
    resolvedLabel,
    adapter,
    resolvedComponent,
    resolvedComponentProps,
    resolvedError,
    resolvedFormItemProps,
    resolvedRules,
    labelWidth,
  }
}
