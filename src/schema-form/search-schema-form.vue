<script setup lang="ts">
import type { DefineSchema } from '@/schema-form/types/common.ts'
import type {
  SearchSchemaFormExpose,
  SearchSchemaFormProps,
  SearchSchemaFormSlots,
} from '@/schema-form/types/search.ts'
import type { Recordable } from '@/types/shared'
import { take } from 'es-toolkit'
import { NButton } from 'naive-ui'
import { computed } from 'vue'
import { useResolvedSchemaFormProps } from '@/config/resolve'
import GridItem from '@/grid/grid-item.vue'
import SchemaFormActions from '@/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/schema-form/core/controller'

const rawProps = defineProps<SearchSchemaFormProps>()
const slots = defineSlots<SearchSchemaFormSlots>()
const props = useResolvedSchemaFormProps('search', rawProps)
const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<DefineSchema[]>('schema', { required: true })
const collapsed = defineModel<boolean>('collapsed', { default: true })

const { formRef, commonExpose, formProps, formContentSlots } = useSchemaFormController(props, model, slots, {
  omitFormProps: ['searchShowNumber', 'schema', 'collapsed', 'enableCollapsed', 'collapsedText', 'expandedText'],
  omitContentSlots: ['actions', 'actionsAfter', 'actionsBefore'],
})

const searchSchemas = computed(() => {
  if (!props.enableCollapsed || !collapsed.value)
    return schema.value
  return take(schema.value, props.searchShowNumber ?? 0)
})

const text = computed(() => !collapsed.value ? props.expandedText : props.collapsedText)

const collapsedVisible = computed(() => props.enableCollapsed && schema.value.length > (props.searchShowNumber ?? 0))

function toggleCollapsed(isCollapsed?: boolean) {
  collapsed.value = isCollapsed ?? !collapsed.value
}

function setFormRef(instance: any) {
  formRef.value = instance ?? undefined
}

defineExpose<SearchSchemaFormExpose>(exposeSchemaForm<SearchSchemaFormExpose>(commonExpose, { toggleCollapsed }))
</script>

<template>
  <SchemaFormWrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <SchemaFormContent :schema="searchSchemas" :grid-props="props.gridProps || {}">
      <template v-for="(_, key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope || {}" />
      </template>
      <GridItem
        v-if="props.showActions"
        :span="4"
        suffix
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
          <template #extra>
            <NButton
              v-if="collapsedVisible"
              type="primary"
              text
              @click="toggleCollapsed()"
            >
              {{ text }}
            </NButton>
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
