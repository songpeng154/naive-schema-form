<script setup lang="ts">
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared'
import { NButton, NFlex } from 'naive-ui'

const props = defineProps<{
  formProps: SchemaFormCommonProps
  expose: SchemaFormCommonExpose
  justify?: 'start' | 'end' | 'center' | 'space-between' | 'space-around' | 'space-evenly'
  actionClass?: string
}>()

const model = defineModel<Recordable>('model', { required: true })

function handleSubmit() {
  if (props.formProps.onSubmit) {
    props.formProps.onSubmit(props.expose.validate, model.value)
  }
  else {
    props.expose.validate()
      .then(() => props.formProps.onFinish?.(model.value))
      .catch(err => props.formProps.onFinishFailed?.(err))
  }
}

function handleReset() {
  if (props.formProps.onReset) {
    props.formProps.onReset(props.expose.resetFields, model.value)
  }
  else {
    props.expose.resetFields()
  }
  props.formProps.onResetAfter?.(model.value)
}
</script>

<template>
  <NFlex
    v-if="formProps.showActions"
    :class="actionClass"
    :justify="justify || 'end'"
    align="center"
    gap="12"
  >
    <slot name="actionsBefore" />
    <template v-if="$slots.actions">
      <slot name="actions" />
    </template>
    <template v-else>
      <NButton
        v-if="formProps.showReset"
        :loading="formProps.resetLoading"
        @click="handleReset"
      >
        {{ formProps.resetText }}
      </NButton>
      <NButton
        type="primary"
        :loading="formProps.submitLoading"
        @click="handleSubmit"
      >
        {{ formProps.submitText }}
      </NButton>
      <slot name="extra" />
    </template>
    <slot name="actionsAfter" />
  </NFlex>
</template>
