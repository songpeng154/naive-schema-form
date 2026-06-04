<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { GridProps } from '@/grid/types'
import { computed, watchEffect } from 'vue'
import { useResolvedGridProps } from '@/config/resolve'
import { useProvideGridContext } from '@/grid/hooks/context.ts'
import { setItemVisible } from '@/grid/utils'

const rawProps = defineProps<GridProps>()
const props = useResolvedGridProps(rawProps)

const gridContext = useProvideGridContext(props)
const { isOverflow, displayIndexList, itemDataList, responsiveCols, responsiveXGap, responsiveYGap } = gridContext

const gridStyle = computed<CSSProperties>(() => ({
  'grid-template-columns': `repeat(${responsiveCols.value}, minmax(0px, 1fr))`,
  'row-gap': `${responsiveYGap.value || 0}px`,
  'column-gap': `${responsiveXGap.value || 0}px`,
}))

watchEffect(() => {
  const itemVisible = setItemVisible(
    responsiveCols.value,
    props.collapsed ?? false,
    props.notCollapsedRows ?? 1,
    itemDataList.value,
  )
  isOverflow.value = itemVisible.overflow
  displayIndexList.value = itemVisible.displayIndexList
})
</script>

<template>
  <div
    :ref="(el) => gridContext.rowEl = el as any"
    class="grid"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
