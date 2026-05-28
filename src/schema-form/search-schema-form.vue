<script setup lang="ts">
import type { DefineSchema } from '@/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared'
import type {
  SearchSchemaFormExpose,
  SearchSchemaFormProps,
  SearchSchemaFormSlots,
} from '@/schema-form/types/search.ts'
import { take } from 'es-toolkit'
import { NButton } from 'naive-ui'
import { computed } from 'vue'
import SchemaFormActions from '@/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/schema-form/core/controller'
import GridItem from '@/grid/grid-item.vue'

const props = withDefaults(defineProps<SearchSchemaFormProps>(), {
  autoPlaceholder: true,
  autoRequiredRule: true,
  autoLabelWidth: true,
  showActions: true,
  showLabel: true,
  showFeedback: true,
  showRequireMark: undefined,
  labelAlign: 'right',
  labelPlacement: 'left',
  inline: true,
  submitText: '搜索',
  resetText: '重置',
  showReset: true,
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  gridItemProps: () => ({
    span: {
      xs: 24,
      sm: 12,
      md: 8,
      lg: 6,
      xl: 4,
    },
  }),
  gridProps: () => ({
    cols: 24,
    yGap: 12,
    responsive: 'self',
  }),
  searchShowNumber: 3,
  enableCollapsed: true,
  collapsedText: '展开',
  expandedText: '收起',
})
const slots = defineSlots<SearchSchemaFormSlots>()

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
  return take(schema.value, props.searchShowNumber)
})

const text = computed(() => !collapsed.value ? props.expandedText : props.collapsedText)

const collapsedVisible = computed(() => props.enableCollapsed && schema.value.length > props.searchShowNumber)

function toggleCollapsed(isCollapsed?: boolean) {
  collapsed.value = isCollapsed ?? !collapsed.value
}

function setFormRef(instance: any) {
  formRef.value = instance ?? undefined
}

defineExpose<SearchSchemaFormExpose>(exposeSchemaForm<SearchSchemaFormExpose>(commonExpose, { toggleCollapsed }))
</script>

<template>
  <schema-form-wrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <schema-form-content :schema="searchSchemas" :grid-props="gridProps">
      <template v-for="(_, key) in formContentSlots" #[key]="scope">
        <slot :name="key" v-bind="scope || {}" />
      </template>
      <grid-item
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
            <n-button
              v-if="collapsedVisible"
              type="primary"
              text
              @click="toggleCollapsed()"
            >
              {{ text }}
            </n-button>
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
