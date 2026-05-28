<script setup lang="ts">
import type { SchemaFormExpose, SchemaFormProps, SchemaFormSlots } from '@/schema-form/types/base.ts'
import type { Recordable } from '@/types/shared'
import type { DefineSchema } from '@/schema-form/types/common.ts'
import SchemaFormActions from '@/schema-form/components/schema-form-actions.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/schema-form/core/controller'
import SchemaFormContent from '@/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/schema-form/components/schema-form-wrap/index.vue'
import GridItem from '@/grid/grid-item.vue'

const props = withDefaults(defineProps<SchemaFormProps>(), {
  autoPlaceholder: true,
  autoRequiredRule: true,
  autoLabelWidth: true,
  scrollToFirstError: true,
  showActions: true,
  showLabel: true,
  showFeedback: true,
  showRequireMark: undefined,
  labelOverflowOmitted: false,
  labelPlacement: 'top',
  submitText: '提交',
  resetText: '重置',
  showReset: true,
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  gridProps: () => ({
    cols: 24,
    yGap: 12,
  }),
  gridItemProps: 24,
})
const slots = defineSlots<SchemaFormSlots>()

const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<DefineSchema[]>('schema', { required: true })

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
  <schema-form-wrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <schema-form-content :schema="schema" :grid-props="gridProps">
      <template v-for="(_, key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope || {}" />
      </template>
      <grid-item
        v-if="props.showActions"
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
      </grid-item>
    </schema-form-content>
  </schema-form-wrap>
</template>

<style scoped >

</style>
