<script setup lang="tsx">
import type { VueInstance } from '@vueuse/core'
import type { FormItemProps } from 'naive-ui'
import type { SchemaFormItemProps } from '@/components/schema-form/components/schema-form-item/types/type.js'
import { Icon } from '@iconify/vue'
import { useCurrentElement } from '@vueuse/core'
import { NFormItem, NTooltip } from 'naive-ui'
import { ref, unref, useSlots } from 'vue'
import GridItem from '@/components/grid/grid-item.vue'
import SchemaComponent from './components/schema-component.vue'
import { useSchemaItem } from './hooks/use-schema-item'

const props = defineProps<SchemaFormItemProps>()

const itemRef = ref<VueInstance>(null as unknown as VueInstance)

const slots = useSlots()

const itemEl = useCurrentElement<HTMLElement>(itemRef)

// 属性解析 Hook
const {
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
} = useSchemaItem(props, itemEl)

// 渲染帮助说明提示框
function renderTooltip(tooltip?: string) {
  const t = unref(tooltip)
  return (
    <NTooltip>
      { {
        default: () => t,
        trigger: () => <Icon icon="mdi:help-circle-outline" class="schema-form-item-help" />,
      } }
    </NTooltip>
  )
}

// 渲染表单项标题 Label 内容
function renderLabelContent() {
  const label = resolvedLabel.value
  if (!label)
    return undefined

  return typeof label === 'string'
    ? <span title={label}>{ label }</span>
    : label
}

// NFormItem 包裹层渲染函数
function FormItem() {
  const fieldVal = unref(props.schema.field)

  const defaultSlot = () => {
    return () => unref(props.schema.formItemSlot)
      ? slots.default?.()
      : (
          <SchemaComponent
            schema={props.schema}
            resolvedComponent={resolvedComponent.value}
            resolvedComponentProps={resolvedComponentProps.value}
            resolvedError={resolvedError.value}
            adapter={adapter.value}
            callbackParams={callbackParams.value}
          />
        )
  }

  const labelSlot = () => {
    if (!resolvedLabel.value)
      return
    return () => (
      <span class="schema-form-item-label-inner">
        { renderLabelContent() }
        { props.schema.tooltip ? renderTooltip(unref(props.schema.tooltip)) : undefined }
      </span>
    )
  }

  const formItemSlots = {
    default: defaultSlot(),
    label: labelSlot(),
  }

  const formItemProps: FormItemProps = {
    feedbackClass: 'feedback',
    path: fieldVal,
    labelWidth: labelWidth.value,
    ...resolvedFormItemProps.value,
  }

  if (resolvedRules.value !== undefined) {
    formItemProps.rule = resolvedRules.value
  }

  return (
    <NFormItem
      ref={itemRef}
      {...formItemProps}
      v-slots={formItemSlots}
    />
  )
}
</script>

<template>
  <GridItem v-if="isVisible" v-bind="gridItemPropsMap">
    <FormItem v-if="!unref(schema.slot)" />
    <slot v-else :name="unref(schema.slot)" />
  </GridItem>
</template>
