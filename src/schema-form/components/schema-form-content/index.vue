<script setup lang="ts">
import type { SchemaFormContent } from '@/schema-form/components/schema-form-content/types/type'
import { computed, defineComponent, useId, watch } from 'vue'
import Grid from '@/grid/grid.vue'
import { useGridContext } from '@/grid/hooks/context.ts'
import SchemaFormItem from '@/schema-form/components/schema-form-item/index.vue'
import { normalizeSchema } from '@/schema-form/core/normalize'
import { useSchemaFormContext } from '@/schema-form/hooks/context.ts'

const { schema, gridProps, gridItemProps, disabled } = defineProps<SchemaFormContent>()
const emit = defineEmits<{
  overflowChange: [value: boolean]
}>()
const id = useId()
const { schemaFormProps, model } = useSchemaFormContext()!
const normalizedSchema = computed(() => normalizeSchema(schema as any, {
  schemaFormProps,
  model: model.value,
  fallbackGridItemProps: gridItemProps,
  disabled,
  formId: id,
}))

const GridOverflowObserver = defineComponent({
  setup() {
    const gridContext = useGridContext()
    if (gridContext) {
      watch(gridContext.isOverflow, value => emit('overflowChange', value), {
        immediate: true,
      })
    }
    return () => null
  },
})
</script>

<template>
  <grid v-bind="gridProps">
    <GridOverflowObserver />
    <template
      v-for="config in normalizedSchema"
      :key="config.key"
    >
      <SchemaFormItem
        v-if="config.componentName || config.formItemSlot || config.itemSlot"
        :id="id"
        :grid-item-props="gridItemProps"
        :schema="config"
        :disabled="disabled"
      >
        <slot v-if="config.formItemSlot" :name="config.formItemSlot" />
        <template v-if="config.itemSlot" #[config.itemSlot]="scope">
          <slot :name="config.itemSlot" v-bind="scope || {}" />
        </template>
      </SchemaFormItem>
    </template>
    <slot />
  </grid>
</template>

<style scoped >

</style>
