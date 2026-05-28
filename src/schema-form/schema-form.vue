<script setup lang="ts">
import type { SchemaFormExpose, SchemaFormProps, SchemaFormSlots } from '@/schema-form/types/base.ts'
import type { DefineSchema } from '@/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared'
import { useResolvedSchemaFormProps } from '@/config/resolve'
import GridItem from '@/grid/grid-item.vue'
import SchemaFormActions from '@/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/schema-form/core/controller'

const rawProps = defineProps<SchemaFormProps>()
const slots = defineSlots<SchemaFormSlots>()
const props = useResolvedSchemaFormProps('base', rawProps)
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
  <SchemaFormWrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <SchemaFormContent :schema="schema" :grid-props="props.gridProps || {}">
      <template v-for="(_, key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope || {}" />
      </template>
      <GridItem
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
      </GridItem>
    </SchemaFormContent>
  </SchemaFormWrap>
</template>

<style scoped>

</style>
