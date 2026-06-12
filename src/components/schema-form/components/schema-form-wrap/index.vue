<script setup lang="ts">
import type { FormInst } from 'naive-ui'
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/schema-form/types/common.js'
import { NForm } from 'naive-ui'
import { ref } from 'vue'
import { useSchemaFormExposeController } from '@/components/schema-form/core/form-expose'
import { useSchemaFormContext } from '@/components/schema-form/hooks/context.js'
import useOmitProps from '@/utils/omit-props'

const props = defineProps<SchemaFormCommonProps>()
const { model } = useSchemaFormContext()!

const nFormProps = useOmitProps(props, [
  'formClass',
  'formStyle',
  'model',
  'gridItemProps',
  'gridProps',
  'showActions',
  'defaultDateFormat',
  'defaultTimeFormat',
  'defaultDateValueFormat',
  'defaultTimeValueFormat',
  'autoPlaceholder',
  'autoRequiredRule',
  'autoLabelWidth',
  'scrollToFirstError',
  'submitLoading',
  'submitText',
  'resetLoading',
  'resetText',
  'showReset',
  'onSubmit',
  'onFinish',
  'onFinishFailed',
  'onReset',
  'onResetAfter',
])

const formRef = ref<FormInst>()
const commonExpose = useSchemaFormExposeController({ props, formRef })

defineExpose<SchemaFormCommonExpose>(commonExpose)
</script>

<template>
  <NForm
    ref="formRef"
    :class="formClass"
    :style="props.formStyle"
    v-bind="nFormProps"
    :model="model"
  >
    <slot />
  </NForm>
</template>

<style scoped>

</style>
