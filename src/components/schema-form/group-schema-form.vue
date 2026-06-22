<script setup lang="ts">
import type {
  DefineGroupSchema,
  GroupSchemaFormExpose,
  GroupSchemaFormProps,
  GroupSchemaFormSlots,
} from '@/components/schema-form/types/group.js'
import { Icon } from '@iconify/vue'
import { NButton, NTooltip, useThemeVars } from 'naive-ui'
import { computed, reactive, toValue } from 'vue'
import SchemaFormActions from '@/components/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/components/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/components/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/components/schema-form/core/controller'
import { useMergeGlobalConfig } from '@/global.js'

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
const model = defineModel<any>('model', { required: true })
const schema = defineModel<DefineGroupSchema[]>('schema', { required: true })

const props = useMergeGlobalConfig('group', rawProps)

const { formRef, commonExpose, formProps, formContentSlots } = useSchemaFormController(props, model, slots, {
  omitFormProps: ['schema'],
  omitContentSlots: ['actions', 'actionsAfter', 'actionsBefore', 'groupTitle', 'collapsedButton'],
})

const themeVars = useThemeVars()

const groupState = reactive(new Map<number, boolean>())
const groupOverflowMap = reactive(new Map<number, boolean>())

const resolvedGroups = computed(() => {
  return schema.value.map((item, index) => {
    const mappedForm = computed(() => {
      const groupDisabled = toValue(item.disabled)
      const groupGridItemProps = toValue(item.gridItemProps)

      if (groupDisabled === undefined && groupGridItemProps === undefined) {
        return item.form
      }

      return item.form.map(field => ({
        ...field,
        disabled: field.disabled ?? groupDisabled,
        gridItemProps: field.gridItemProps ?? groupGridItemProps,
      }))
    })

    return {
      index,
      get title() { return toValue(item.title) || '' },
      get helpMessage() { return toValue(item.helpMessage) },
      get isHidden() {
        const hide = item.hide
        if (typeof hide === 'function') {
          return hide({ group: item as any, model: model.value })
        }
        return !!toValue(hide)
      },
      get isCollapsed() {
        return groupState.get(index) ?? toValue(item.collapsed) ?? props.defaultCollapsed ?? false
      },
      get gridProps() {
        return {
          ...(props.gridProps || {}),
          ...toValue(item.gridProps),
          collapsed: this.isCollapsed,
          notCollapsedRows: item.collapsedRows ?? props.defaultCollapsedRows ?? 2,
        }
      },
      get form() { return mappedForm.value },
      get isCollapseButtonVisible() {
        return !toValue(item.hideCollapseButton) && groupOverflowMap.get(index) === true
      },
      get expandCollapseText() {
        return this.isCollapsed ? props.collapsedText : props.expandedText
      },
    } as any
  })
})

function toggleCollapse(index: number, isCollapsed?: boolean) {
  const currentState = groupState.get(index) ?? toValue(schema.value[index].collapsed) ?? props.defaultCollapsed
  groupState.set(index, isCollapsed ?? !currentState)
}

function handleGroupOverflowChange(index: number, isOverflow: boolean) {
  groupOverflowMap.set(index, isOverflow)
}

function setFormRef(instance: any) {
  formRef.value = instance ?? undefined
}

defineExpose<GroupSchemaFormExpose>(exposeSchemaForm<GroupSchemaFormExpose>(commonExpose, {
  toggleCollapsed: toggleCollapse,
}))
</script>

<template>
  <SchemaFormWrap
    :ref="setFormRef"
    v-bind="formProps"
    :model="model"
  >
    <template v-for="group in resolvedGroups" :key="group.index">
      <template v-if="!group.isHidden">
        <div class="schemaForm-groupHeader">
          <div class="schemaForm-groupHeader-title">
            <slot name="groupTitle" :config="group">
              <span class="schemaForm-groupHeader-title-placeholder" :style="{ background: themeVars.primaryColor }" />
              <span class="schemaForm-groupHeader-title-name">{{ group.title }}</span>
            </slot>
            <NTooltip v-if="group.helpMessage" trigger="hover">
              <template #trigger>
                <Icon icon="mdi:help-circle-outline" class="schemaForm-groupHeader-help" />
              </template>
              {{ group.helpMessage }}
            </NTooltip>
          </div>
          <slot
            v-if="group.isCollapseButtonVisible"
            name="collapsedButton"
            :config="group"
            :overflow="groupOverflowMap.get(group.index) === true"
            :toggle-collapsed="((isCollapsed?: boolean) => toggleCollapse(group.index, isCollapsed)) as any"
          >
            <NButton
              :disabled="false"
              text
              type="primary"
              @click="toggleCollapse(group.index)"
            >
              {{ group.expandCollapseText }}
            </NButton>
          </slot>
        </div>
        <SchemaFormContent
          class="px-5px"
          :schema="group.form"
          :grid-props="group.gridProps"
          @overflow-change="handleGroupOverflowChange(group.index, $event)"
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
