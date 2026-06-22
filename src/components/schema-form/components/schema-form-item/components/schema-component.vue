<script setup lang="tsx">
import type { DefineSchema, OptionType, Schema } from '@/components/schema-form/types/common.js'
import { isFunction, isString } from 'es-toolkit'
import { isArray } from 'es-toolkit/compat'
import { NCheckbox, NRadio } from 'naive-ui'
import { isVNode, unref } from 'vue'
import { useSchemaFormContext } from '@/components/schema-form/hooks/context.js'

const props = defineProps<{
  schema: DefineSchema
  resolvedComponent: any
  resolvedComponentProps: any
  resolvedError?: string
  adapter: any
  callbackParams: any
}>()

const { getModelValue, setModelValue } = useSchemaFormContext()!

function renderOptionsComponent(options: OptionType[], Component: any) {
  return options.map(item => (
    <Component
      value={unref(item.value)}
      disabled={unref(item.disabled)}
    >
      { unref(item.label) }
    </Component>
  ))
}

function renderComponentSlots() {
  const raw = props.schema
  const componentSlots = raw.componentSlots
  const unreffedOptions = unref(raw.options)
  const isOptionsTransformCheckbox = raw.component === 'checkbox-group' && unreffedOptions
  const isOptionsTransformRadio = raw.component === 'radio-group' && unreffedOptions

  if (!componentSlots && !isOptionsTransformCheckbox && !isOptionsTransformRadio)
    return undefined

  const defaultSlot = (slot: Schema['componentSlots']) => ({ default: () => slot })

  if (isOptionsTransformCheckbox)
    return defaultSlot(renderOptionsComponent(unreffedOptions!, NCheckbox))
  if (isOptionsTransformRadio)
    return defaultSlot(renderOptionsComponent(unreffedOptions!, NRadio))

  const content = isFunction(componentSlots)
    ? componentSlots(props.callbackParams)
    : componentSlots

  if (isArray(content) || isString(content) || isVNode(content))
    return defaultSlot(content)

  return content
}

function RenderSchemaComponent() {
  const item = props.schema
  const RawComponent = props.resolvedComponent

  if (props.resolvedError) {
    console.error(props.resolvedError)
    return
  }

  if (!RawComponent)
    return null

  const modelProp = unref(item.modelProp) || props.adapter?.modelProp || 'value'
  const fieldVal = unref(item.field)
  const modelBind = fieldVal
    ? {
        [modelProp]: getModelValue(fieldVal),
        [`onUpdate:${modelProp}`]: (v: any) => setModelValue(fieldVal, v),
      }
    : {}

  return (
    <RawComponent
      v-slots={renderComponentSlots()}
      {...modelBind}
      {...props.resolvedComponentProps}
    />
  )
}
</script>

<template>
  <RenderSchemaComponent />
</template>
