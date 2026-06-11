<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { GridProps } from '@/grid/types'
import { computed, watchEffect } from 'vue'
import { useProvideGridContext } from '@/grid/hooks/context.ts'
import { setItemVisible } from '@/grid/utils'

const props = withDefaults(defineProps<GridProps>(), {
  breakpoints: () => ({
    xs: 530,
    sm: 768,
    md: 992,
    lg: 1200,
    xl: 1920,
  }),
})

const gridContext = useProvideGridContext(props)
const { isOverflow, displayIndexList, itemDataList, responsiveCols, responsiveXGap, responsiveYGap } = gridContext

const gridStyle = computed<CSSProperties>(() => ({
  'grid-template-columns': `repeat(${responsiveCols.value}, minmax(0px, 1fr))`,
  'row-gap': `${responsiveYGap.value || 0}px`,
  'column-gap': `${responsiveXGap.value || 0}px`,
}))

function setRowel(el: any) {
  gridContext.rowEl.value = el
}

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
    :ref="setRowel"
    class="grid"
    :style="gridStyle"
  >
    <slot />
  </div>
</template>

<style scoped>

</style>
