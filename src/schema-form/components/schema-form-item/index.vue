<script setup lang="tsx">
import type { GridItemProps } from '@/grid/types'
import type { SchemaFormItemProps } from '@/schema-form/components/schema-form-item/types/type.ts'
import type { CallbackParams, OptionType, Schema } from '@/schema-form/types/common.ts'
import { isString, omitBy } from 'es-toolkit'
import { isArray, isNumber } from 'es-toolkit/compat'
import { isVNode, computed, nextTick, onUnmounted, useSlots, watch } from 'vue'
import { useCurrentElement } from '@vueuse/core'
import { NAlert, NCheckbox, NFormItem, NRadio, NTooltip } from 'naive-ui'
import GridItem from '@/grid/grid-item.vue'
import { useSchemaFormContext } from '@/schema-form/hooks/context.ts'

const props = defineProps<SchemaFormItemProps>()
const slots = useSlots()
const { getModelValue, setModelValue, maxLabelWidth, itemsDataMap, schemaFormProps } = useSchemaFormContext()!
const itemEl = useCurrentElement<HTMLElement>()
const uniqueIdentifier = computed(() => props.schema.key)

const isVisible = computed(() => props.schema.visible)
const gridItemPropsMap = computed(() => {
  const item = props.schema.gridItemProps || props.gridItemProps || schemaFormProps.gridItemProps
  return (isNumber(item) ? { span: item } : item) as GridItemProps
})

const labelWidth = computed(() => {
  const raw = props.schema.raw
  if (raw.labelWidth)
    return raw.labelWidth
  if (schemaFormProps.labelWidth)
    return schemaFormProps.labelWidth
  return schemaFormProps.autoLabelWidth && maxLabelWidth.value && schemaFormProps.labelPlacement !== 'top' ? `${maxLabelWidth.value}px` : undefined
})

const shouldMeasureLabel = computed(() => Boolean(
  schemaFormProps.autoLabelWidth
  && schemaFormProps.labelPlacement !== 'top'
  && props.schema.field
  && isVisible.value
  && !props.schema.raw.labelWidth
  && !schemaFormProps.labelWidth,
))

function optionsMapCheckboxComponent(options: OptionType[]) {
  return options.map(item => (
    <NCheckbox
      value={item.value}
      disabled={item.disabled}
    >
      { item.label }
    </NCheckbox>
  ))
}

function optionsMapRadioComponent(options: OptionType[]) {
  return options.map(item => (
    <NRadio
      value={item.value}
      disabled={item.disabled}
    >
      { item.label }
    </NRadio>
  ))
}

function renderTooltip(tooltip?: string) {
  return (
    <NTooltip>
      { {
        default: () => tooltip,
        trigger: () => <span class="schema-form-item-help">?</span>,
      } }
    </NTooltip>
  )
}

function renderComponentSlots() {
  const raw = props.schema.raw
  const componentSlots = raw.componentSlots
  const isOptionsTransformCheckbox = raw.component === 'checkboxGroup' && raw.options
  const isOptionsTransformRadio = raw.component === 'radioGroup' && raw.options

  if (!componentSlots && !isOptionsTransformCheckbox && !isOptionsTransformRadio)
    return undefined

  const defaultSlot = (slot: Schema['componentSlots']) => ({ default: () => slot })

  if (isOptionsTransformCheckbox)
    return defaultSlot(optionsMapCheckboxComponent(raw.options!))
  if (isOptionsTransformRadio)
    return defaultSlot(optionsMapRadioComponent(raw.options!))

  const content = typeof componentSlots === 'function'
    ? (componentSlots as (params: CallbackParams) => any)({
        schema: raw,
        model: props.schema.model,
        value: props.schema.field ? getModelValue(props.schema.field) : undefined,
        field: props.schema.field as any,
      } as CallbackParams)
    : componentSlots

  if (isArray(content) || isString(content) || isVNode(content))
    return defaultSlot(content)

  return content
}

function renderSchemaComponent() {
  const item = props.schema
  const RawComponent = item.component as any

  if (item.error)
    return <NAlert type="error" title="Schema component error">{item.error}</NAlert>

  if (!RawComponent)
    return undefined

  const modelProp = item.raw.modelProp || item.adapter?.modelProp || 'value'
  const modelBind = item.field
    ? {
        [modelProp]: getModelValue(item.field),
        [`onUpdate:${modelProp}`]: (v: any) => setModelValue(item.field!, v),
      }
    : {}

  return (
    <RawComponent
      v-slots={renderComponentSlots()}
      {...modelBind}
      {...item.componentProps}
    />
  )
}

function renderFormItemSlots() {
  const item = props.schema
  const defaultSlot = () => {
    return () => item.formItemSlot ? slots.default?.() : renderSchemaComponent()
  }
  const labelSlot = () => {
    if (!item.label)
      return
    return () => (
      <>
        { item.label }
        { item.raw.tooltip ? renderTooltip(item.raw.tooltip) : undefined }
      </>
    )
  }

  return omitBy(
    {
      default: defaultSlot(),
      label: labelSlot(),
    },
    value => value === undefined,
  )
}

function FormItem() {
  return (
    <NFormItem
      feedback-class="feedback"
      {...props.schema.formItemProps}
      rule={props.schema.rules}
      path={props.schema.field}
      labelWidth={labelWidth.value}
      v-slots={renderFormItemSlots()}
    />
  )
}

let stopLabelResize: (() => void) | undefined
let activeLabelKey: string | undefined
let activeItemKey: string | undefined

function clearItemData() {
  if (activeItemKey)
    itemsDataMap.delete(activeItemKey)
  activeItemKey = undefined
}

function setItemData(labelWidth?: number) {
  if (!itemEl.value || !props.schema.field || !isVisible.value) {
    clearItemData()
    return
  }
  const key = uniqueIdentifier.value
  if (activeItemKey && activeItemKey !== key)
    itemsDataMap.delete(activeItemKey)
  const current = itemsDataMap.get(key)
  itemsDataMap.set(key, {
    el: itemEl.value,
    field: props.schema.field,
    labelWidth: labelWidth ?? current?.labelWidth,
  })
  activeItemKey = key
}

function clearLabelMeasure() {
  stopLabelResize?.()
  stopLabelResize = undefined
  if (activeLabelKey) {
    const current = itemsDataMap.get(activeLabelKey)
    if (current)
      itemsDataMap.set(activeLabelKey, { ...current, labelWidth: 0 })
  }
  activeLabelKey = undefined
}

function setLabelWidth(label: HTMLElement) {
  if (!itemEl.value || !props.schema.field || !activeLabelKey)
    return
  const previousWidth = label.style.width
  label.style.width = 'auto'
  const labelText = label.querySelector<HTMLElement>('.n-form-item-label__text')
  const labelTextWidth = labelText?.scrollWidth ?? 0
  const labelWidth = Math.max(label.scrollWidth, labelTextWidth)
  label.style.width = previousWidth
  setItemData(Math.ceil(labelWidth))
}

watch([itemEl, () => props.schema.field, isVisible], () => {
  setItemData()
}, { flush: 'post', immediate: true })

watch([itemEl, () => props.schema.label, shouldMeasureLabel], async () => {
  clearLabelMeasure()
  if (!shouldMeasureLabel.value)
    return
  await nextTick()
  if (!itemEl.value)
    return
  const label = itemEl.value.querySelector<HTMLElement>('.n-form-item-label')
  if (!label)
    return
  activeLabelKey = uniqueIdentifier.value
  setLabelWidth(label)

  if (typeof ResizeObserver === 'undefined')
    return
  const observer = new ResizeObserver(() => setLabelWidth(label))
  observer.observe(label)
  stopLabelResize = () => observer.disconnect()
}, { flush: 'post' })

onUnmounted(() => {
  clearLabelMeasure()
  clearItemData()
})
</script>

<template>
  <grid-item v-if="isVisible" v-bind="gridItemPropsMap">
    <FormItem v-if="!schema.itemSlot" />
    <slot v-else :name="schema.itemSlot" />
  </grid-item>
</template>

<style scoped >
:deep(.n-input-number), :deep(.n-time-picker), :deep(.n-date-picker) {
  width: 100%;
}

:deep(.feedback) {
  min-height: 20px;
  height: 20px;
  font-size: 12px;
  padding-top: 2px !important;
}

:deep(.n-form-item-label__text) {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.schema-form-item-help {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 14px;
  height: 14px;
  margin-left: 5px;
  margin-bottom: 4px;
  font-size: 12px;
  line-height: 1;
  color: var(--n-text-color-3);
  border: 1px solid currentColor;
  border-radius: 50%;
  cursor: help;
}
</style>
