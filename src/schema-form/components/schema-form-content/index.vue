<script setup lang="ts">
import type { SchemaFormContent } from '@/schema-form/components/schema-form-content/types/type'
import { useId } from 'vue'
import Grid from '@/grid/grid.vue'
import SchemaFormItem from '@/schema-form/components/schema-form-item/index.vue'

const { schema, gridProps, gridItemProps, disabled } = defineProps<SchemaFormContent>()
const id = useId()
</script>

<template>
  <Grid v-bind="gridProps">
    <template
      v-for="(config, index) in schema"
      :key="config.field || config.slot || config.formItemSlot || `${id}-${index}`"
    >
      <SchemaFormItem
        v-if="config.component || config.formItemSlot || config.slot"
        :id="id"
        :index="index"
        :grid-item-props="gridItemProps"
        :schema="config"
        :disabled="disabled"
      >
        <slot v-if="config.formItemSlot" :name="config.formItemSlot" />
        <template v-if="config.slot" #[config.slot]="scope">
          <slot :name="config.slot" v-bind="scope || {}" />
        </template>
      </SchemaFormItem>
    </template>
    <slot />
  </Grid>
</template>

<style scoped>

</style>
