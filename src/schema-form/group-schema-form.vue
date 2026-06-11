<script setup lang="ts">
import type { GridProps } from '@/grid/types'
import type {
  DefineGroupSchema,
  GroupCallbackSchema,
  GroupSchemaFormExpose,
  GroupSchemaFormProps,
  GroupSchemaFormSlots,
  RuntimeGroupSchema,
} from '@/schema-form/types/group.ts'
import type { Recordable } from '@/types/shared'
import { Icon } from '@iconify/vue'
import { isBoolean, isFunction } from 'es-toolkit'
import { NButton, NTooltip, useThemeVars } from 'naive-ui'
import { computed, reactive, unref } from 'vue'
import { useMergeGlobalConfig } from '@/global.ts'
import SchemaFormActions from '@/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/schema-form/core/controller'

const rawProps = withDefaults(defineProps<GroupSchemaFormProps>(), {
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
  // ---- group 变体默认值 ----
  scrollToFirstError: true,
  labelOverflowOmitted: false,
  labelPlacement: 'top',
  gridProps: () => ({
    cols: 24,
    yGap: 12,
    xGap: 12,
  }),
  gridItemProps: 24,
  collapsedText: '展开',
  expandedText: '收起',
  defaultCollapsed: true,
  defaultCollapsedRows: 2,
})

const slots = defineSlots<GroupSchemaFormSlots>()
const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<DefineGroupSchema[]>('schema', { required: true })

const props = useMergeGlobalConfig('group', rawProps)

const { formRef, commonExpose, formProps, formContentSlots } = useSchemaFormController(props, model, slots, {
  omitFormProps: ['schema'],
  omitContentSlots: ['actions', 'actionsAfter', 'actionsBefore', 'groupTitle', 'collapsedButton'],
})

const themeVars = useThemeVars()

const groupState = reactive(new Map<string, boolean>())
const groupOverflowMap = reactive(new Map<string, boolean>())

function getGroupKey(config: DefineGroupSchema, index: number) {
  return `${String(unref(config.title) || 'group')}-${index}`
}

function createRuntimeGroupSchema(item: DefineGroupSchema, index: number): RuntimeGroupSchema {
  const key = getGroupKey(item, index)
  const userCollapsed = groupState.get(key)
  const collapsed = userCollapsed ?? item.collapsed ?? props.defaultCollapsed
  return {
    key,
    title: unref(item.title) || '',
    helpMessage: unref(item.helpMessage),
    hide: typeof item.hide === 'function' ? item.hide : unref(item.hide),
    form: item.form,
    collapsed,
    collapsedRows: item.collapsedRows ?? props.defaultCollapsedRows ?? 2,
    hideCollapseButton: unref(item.hideCollapseButton),
    disabled: unref(item.disabled),
    gridItemProps: unref(item.gridItemProps),
    gridProps: unref(item.gridProps),
  }
}

const groupSchema = computed<RuntimeGroupSchema[]>(() => {
  return schema.value.map((group, index) => createRuntimeGroupSchema(group, index))
})

function createGroupCallbackSchema(config: RuntimeGroupSchema): GroupCallbackSchema {
  return {
    key: config.key,
    title: config.title,
    helpMessage: config.helpMessage,
    form: config.form,
    collapsed: config.collapsed,
    collapsedRows: config.collapsedRows,
    hideCollapseButton: config.hideCollapseButton,
    disabled: config.disabled,
    gridItemProps: config.gridItemProps,
    gridProps: config.gridProps,
  }
}

function handleGroupHide(config: RuntimeGroupSchema) {
  let isVisible = true
  const hideVal = unref(config.hide)
  if (isBoolean(hideVal))
    isVisible = !hideVal
  if (isFunction(hideVal))
    isVisible = !hideVal({ group: createGroupCallbackSchema(config), model: model.value })
  return isVisible
}

function getGroupExpandCollapseText(config: RuntimeGroupSchema) {
  return config.collapsed ? props.collapsedText : props.expandedText
}

function toggleCollapse(config: RuntimeGroupSchema, isCollapsed?: boolean) {
  groupState.set(config.key, isCollapsed ?? !config.collapsed)
}

function toggleCollapseByIndex(index: number, isCollapsed?: boolean) {
  const group = groupSchema.value[index]
  group && toggleCollapse(group, isCollapsed)
}

function handleGroupOverflowChange(config: RuntimeGroupSchema, isOverflow: boolean) {
  groupOverflowMap.set(config.key, isOverflow)
}

function isCollapseButtonVisible(config: RuntimeGroupSchema) {
  return !config.hideCollapseButton && groupOverflowMap.get(config.key) === true
}

function handleGridPropsMap(config: RuntimeGroupSchema): GridProps {
  return {
    ...(props.gridProps || {}),
    ...config.gridProps,
    collapsed: config.collapsed,
    notCollapsedRows: config.collapsedRows,
  }
}

function setFormRef(instance: any) {
  formRef.value = instance ?? undefined
}

defineExpose<GroupSchemaFormExpose>(exposeSchemaForm<GroupSchemaFormExpose>(commonExpose, {
  toggleCollapsed: toggleCollapseByIndex,
}))
</script>

<template>
  <SchemaFormWrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <template v-for="(config) in groupSchema" :key="config.key">
      <template v-if="handleGroupHide(config)">
        <div class="schemaForm-groupHeader">
          <div class="schemaForm-groupHeader-title">
            <slot name="groupTitle" :config="config">
              <span class="schemaForm-groupHeader-title-placeholder" :style="{ background: themeVars.primaryColor }" />
              <span class="schemaForm-groupHeader-title-name">{{ config.title }}</span>
            </slot>
            <NTooltip v-if="config.helpMessage" trigger="hover">
              <template #trigger>
                <Icon icon="mdi:help-circle-outline" class="schemaForm-groupHeader-help" />
              </template>
              {{ config.helpMessage }}
            </NTooltip>
          </div>
          <slot
            v-if="isCollapseButtonVisible(config)"
            name="collapsedButton"
            :config="config"
            :overflow="groupOverflowMap.get(config.key) === true"
            :toggle-collapsed="toggleCollapse"
          >
            <NButton
              :disabled="false"
              text
              type="primary"
              @click="toggleCollapse(config)"
            >
              {{ getGroupExpandCollapseText(config) }}
            </NButton>
          </slot>
        </div>
        <SchemaFormContent
          class="px-5px"
          :schema="config.form"
          :disabled="config.disabled"
          :grid-item-props="config.gridItemProps"
          :grid-props="handleGridPropsMap(config)"
          @overflow-change="handleGroupOverflowChange(config, $event)"
        >
          <template v-for="(_, key) in formContentSlots" #[key]="scope">
            <slot :name="key as GroupSchemaFormSlots" v-bind="scope || {}" />
          </template>
        </SchemaFormContent>
      </template>
    </template>
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
  </SchemaFormWrap>
</template>

<style scoped>

</style>
