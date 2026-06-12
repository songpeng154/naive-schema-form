<script setup lang="ts">
import type { SchemaFormExpose, SchemaFormProps, SchemaFormSlots } from '@/components/schema-form/types/base.js'
import type { DefineSchema } from '@/components/schema-form/types/common.js'
import type { Recordable } from '@/types/shared'
import GridItem from '@/components/grid/grid-item.vue'
import SchemaFormActions from '@/components/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/components/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/components/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/components/schema-form/core/controller'
import { useMergeGlobalConfig } from '@/global.js'

const rawProps = withDefaults(defineProps<SchemaFormProps>(), {
  // ---- 通用默认值（common）----
  autoPlaceholder: true,
  autoRequiredRule: true,
  autoLabelWidth: true,
  showActions: true,
  showLabel: true,
  showFeedback: true,
  showReset: true,
  showRequireMark: undefined,
  submitText: '提交',
  resetText: '重置',
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  // ---- base 变体默认值 ----
  scrollToFirstError: true,
  labelOverflowOmitted: false,
  labelPlacement: 'top',
  gridProps: () => ({ cols: 24, yGap: 12, xGap: 12 }),
  gridItemProps: 24,
})
const slots = defineSlots<SchemaFormSlots>()
const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<DefineSchema[]>('schema', { required: true })

const props = useMergeGlobalConfig('base', rawProps)

const { formRef, commonExpose, formProps, formContentSlots } = useSchemaFormController(props, model, slots, {
  omitFormProps: ['schema'],
  omitContentSlots: ['actions', 'actionsAfter', 'actionsBefore'],
})

function setFormRef(instance: any) {
  formRef.value = instance ?? undefined
}

defineExpose<SchemaFormExpose>(exposeSchemaForm<SchemaFormExpose>(commonExpose))
</script>

<template>
  <SchemaFormWrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <SchemaFormContent :schema="schema" :grid-props="props.gridProps || {}">
      <template v-for="(_, key) in formContentSlots" #[key]="scope">
        <slot :name="key as SchemaFormSlots" v-bind="scope || {}" />
      </template>
      <GridItem
        v-if="rawProps.showActions"
        suffix
        :span="24"
      >
        <SchemaFormActions
          v-model:model="model"
          :form-props="props"
          :expose="commonExpose"
        >
          <template #actionsBefore>
            <slot name="actionsBefore" />
          </template>
          <template v-if="$slots.actions" #actions>
            <slot name="actions" />
          </template>
          <template #actionsAfter>
            <slot name="actionsAfter" />
          </template>
        </SchemaFormActions>
      </GridItem>
    </SchemaFormContent>
  </SchemaFormWrap>
</template>

<style scoped>

</style>
