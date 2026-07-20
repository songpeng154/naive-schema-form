<script setup lang="ts">
import type { DefineSchema } from '@/components/schema-form/types/common.js'
import type {
  SearchSchemaFormExpose,
  SearchSchemaFormProps,
  SearchSchemaFormSlots,
} from '@/components/schema-form/types/search.js'
import { isNumber, take } from 'es-toolkit'
import { NButton } from 'naive-ui'
import { computed } from 'vue'
import GridItem from '@/components/grid/grid-item.vue'
import SchemaFormActions from '@/components/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/components/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/components/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/components/schema-form/core/controller'
import { useMergeGlobalConfig } from '@/global.js'

const rawProps = withDefaults(defineProps<SearchSchemaFormProps>(), {
  // ---- 通用默认值（common）----
  autoPlaceholder: true,
  autoRequiredRule: true,
  autoLabelWidth: true,
  showActions: true,
  showLabel: true,
  showFeedback: false,
  showReset: true,
  showRequireMark: undefined,
  submitText: '搜索', // 搜索变体默认值为 '搜索'
  resetText: '重置',
  defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeFormat: 'HH:mm:ss',
  defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
  defaultTimeValueFormat: 'HH:mm:ss',
  // ---- search 变体默认值 ----
  labelAlign: 'right',
  labelPlacement: 'left',
  inline: true,
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
    xGap: 12,
    responsive: 'self',
  }),
  searchShowNumber: 3,
  enableCollapsed: true,
  collapsedText: '展开',
  expandedText: '收起',
})

const slots = defineSlots<SearchSchemaFormSlots>()
const model = defineModel<any>('model', { required: true })
const schema = defineModel<DefineSchema[]>('schema', { required: true })
const collapsed = defineModel<boolean>('collapsed', { default: true })

const props = useMergeGlobalConfig('search', rawProps) as unknown as SearchSchemaFormProps

const { formRef, commonExpose, formProps, formContentSlots } = useSchemaFormController(props, model, slots, {
  omitFormProps: ['searchShowNumber', 'schema', 'collapsed', 'enableCollapsed', 'collapsedText', 'expandedText'],
  omitContentSlots: ['actions', 'actionsAfter', 'actionsBefore'],
})

const searchSchemas = computed(() => {
  if (!props.enableCollapsed || !collapsed.value)
    return schema.value
  return take(schema.value, props.searchShowNumber ?? 0)
})

const searchGridProps = computed(() => {
  const base = props.gridProps || {}
  if (props.showFeedback === false && base.yGap === undefined) {
    return { ...base, yGap: 12 }
  }
  return base
})

const text = computed(() => !collapsed.value ? props.expandedText : props.collapsedText)

const collapsedVisible = computed(() => props.enableCollapsed && schema.value.length > (props.searchShowNumber ?? 0))

const actionGridSpan = computed(() => isNumber(props.gridItemProps) ? props.gridItemProps : props.gridItemProps?.span || 6)

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
    <SchemaFormContent :grid-props="searchGridProps" :schema="searchSchemas">
      <template v-for="(_, key) in formContentSlots" #[key]="scope">
        <slot :name="key as SearchSchemaFormSlots" v-bind="scope || {}" />
      </template>
      <GridItem
        v-if="props.showActions"
        :span="actionGridSpan"
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
