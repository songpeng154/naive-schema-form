<script setup lang="ts">
import type { DefineSchema } from '@/schema-form/types/common.ts'
import type {
  PopupSchemaFormExpose,
  PopupSchemaFormProps,
  PopupSchemaFormSlots,
} from '@/schema-form/types/popup.ts'
import type { Recordable } from '@/types/shared'
import { createReusableTemplate } from '@vueuse/core'
import { NCard, NDrawer, NDrawerContent, NModal, useDialog } from 'naive-ui'
import { useMergeGlobalConfig } from '@/global.ts'
import SchemaFormActions from '@/schema-form/components/schema-form-actions.vue'
import SchemaFormContent from '@/schema-form/components/schema-form-content/index.vue'
import SchemaFormWrap from '@/schema-form/components/schema-form-wrap/index.vue'
import { exposeSchemaForm, useSchemaFormController } from '@/schema-form/core/controller'

const rawProps = withDefaults(defineProps<PopupSchemaFormProps>(), {
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
  // ---- popup 变体默认值 ----
  scrollToFirstError: true,
  labelOverflowOmitted: false,
  labelPlacement: 'top',
  gridProps: () => ({
    cols: 24,
    yGap: 12,
    xGap: 12,
  }),
  gridItemProps: 24,
  type: 'drawer',
  maskClosable: true,
  resetOnClose: true,
  confirmOnClose: true,
  confirmTitle: '关闭提示',
  confirmContent: '您确定要关闭它吗？',
  drawerContentProps: () => ({
    closable: true,
  }),
})

const slots = defineSlots<PopupSchemaFormSlots>()

const drawerDefaultWidth = '500px'
const modalDefaultWidth = '800px'
const modalDefaultHeight = '70vh'

const model = defineModel<Recordable>('model', { required: true })
const schema = defineModel<DefineSchema[]>('schema', { required: true })
const visible = defineModel<boolean>('visible', { required: true })

const [DefineActionButton, ActionButton] = createReusableTemplate()
const [DefineForm, Form] = createReusableTemplate()

const props = useMergeGlobalConfig('popup', rawProps)

const { formRef, commonExpose, formProps, formContentSlots } = useSchemaFormController(props, model, slots, {
  omitFormProps: [
    'schema',
    'visible',
    'type',
    'title',
    'width',
    'height',
    'drawerProps',
    'drawerContentProps',
    'modalProps',
    'modalCardProps',
    'maskClosable',
    'resetOnClose',
    'confirmOnClose',
    'confirmTitle',
    'confirmContent',
  ],
  omitContentSlots: ['actions', 'actionsAfter', 'actionsBefore', 'header', 'formBefore', 'formAfter', 'footer'],
})

const dialog = useDialog()

function closeAndReset() {
  props.resetOnClose && commonExpose.resetFields()
  visible.value = false
}

function showConfirmModal() {
  dialog.warning({
    title: props.confirmTitle,
    content: props.confirmContent,
    positiveText: '确定',
    negativeText: '取消',
    onPositiveClick: () => {
      closeAndReset()
    },
    onNegativeClick: () => {},
  })
}

function onUpdateShow(isShow: boolean) {
  if (isShow)
    return
  if (props.confirmOnClose)
    return showConfirmModal()
  closeAndReset()
}

function setFormRef(instance: any) {
  formRef.value = instance ?? undefined
}

defineExpose<PopupSchemaFormExpose>(exposeSchemaForm<PopupSchemaFormExpose>(commonExpose))
</script>

<template>
  <DefineActionButton>
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
  </DefineActionButton>

  <DefineForm>
    <SchemaFormWrap
      :ref="setFormRef"
      v-bind="formProps"
      :model="model"
    >
      <SchemaFormContent :schema="schema" :grid-props="props.gridProps || {}">
        <template v-for="(_, key) in formContentSlots" #[key]="scope">
          <slot :name="key as PopupSchemaFormSlots" v-bind="scope || {}" />
        </template>
      </SchemaFormContent>
    </SchemaFormWrap>
  </DefineForm>

  <NDrawer
    v-if="props.type === 'drawer'"
    :width="props.width || drawerDefaultWidth"
    :height="props.height"
    v-bind="props.drawerProps"
    :show="visible"
    :mask-closable="props.maskClosable"
    @update:show="onUpdateShow"
  >
    <NDrawerContent v-bind="props.drawerContentProps">
      <template #header>
        <slot name="header">
          {{ props.title || props.drawerContentProps?.title }}
        </slot>
      </template>
      <slot name="formBefore" />
      <Form />
      <slot name="formAfter" />
      <template #footer>
        <slot name="footer">
          <ActionButton />
        </slot>
      </template>
    </NDrawerContent>
  </NDrawer>

  <NModal
    v-else-if="props.type === 'modal'"
    v-bind="props.modalProps"
    :show="visible"
    :mask-closable="props.maskClosable"
    @update:show="onUpdateShow"
  >
    <NCard
      :style="{ width: props.width || modalDefaultWidth, height: props.height || modalDefaultHeight }"
      content-class="overflow-auto"
      v-bind="props.modalCardProps"
    >
      <template #header>
        <slot name="header">
          {{ props.title || props.modalCardProps?.title }}
        </slot>
      </template>
      <slot name="formBefore" />
      <Form />
      <slot name="formAfter" />
      <template #footer>
        <slot name="footer">
          <ActionButton />
        </slot>
      </template>
    </NCard>
  </NModal>
</template>

<style scoped>
</style>
