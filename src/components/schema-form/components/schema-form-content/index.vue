<script setup lang="ts">
import type { SchemaFormContent } from '@/components/schema-form/components/schema-form-content/types/type'
import { useId } from 'vue'
import Grid from '@/components/grid/grid.vue'
import SchemaFormItem from '@/components/schema-form/components/schema-form-item/index.vue'

const { schema, gridProps } = defineProps<SchemaFormContent>()

const id = useId()
</script>

<template>
  <Grid v-bind="gridProps">
    <template
      v-for="(config, index) in schema"
      :key="config.field || config.slot || config.formItemSlot || config.render || config.formItemRender || `${id}-${index}`"
    >
      <SchemaFormItem
        v-if="config.component || config.formItemSlot || config.slot || config.render || config.formItemRender"
        :id="id"
        :index="index"
        :schema="config"
      >
        <template v-if="config.formItemSlot" #default="scope">
          <slot :name="config.formItemSlot" v-bind="scope || {}" />
        </template>
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
