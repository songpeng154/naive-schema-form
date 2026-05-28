<script setup lang="ts">
import type { CSSProperties } from 'vue'
import type { GridItemProps } from '@/grid/types'
import { computed, onUnmounted, ref, watchEffect } from 'vue'
import { useNaiveSchemaFormConfig } from '@/config/context'
import { useResolvedGridItemProps } from '@/config/resolve'
import { useGridContext } from '@/grid/hooks/context.ts'
import responsivePropsValue from '@/grid/hooks/responsive-props-value.ts'
import { resolveItemData } from '@/grid/utils'
import elementIndex from '@/utils/element-index'

const rawProps = defineProps<GridItemProps>()
const props = useResolvedGridItemProps(rawProps)
const config = useNaiveSchemaFormConfig()

const el = ref<HTMLElement>()

const {
  isOverflow,
  displayIndexList,
  responsiveCols,
  width,
  responsiveXGap,
  setItemMap,
  removeItemMap,
} = useGridContext()!
const index = elementIndex(el)
const responsiveSpan = responsivePropsValue(width, props, 'span', config.grid.breakpoints)
const responsiveOffset = responsivePropsValue(width, props, 'offset', config.grid.breakpoints)

const itemData = computed(() => resolveItemData(responsiveCols.value, {
  span: responsiveSpan.value,
  offset: responsiveOffset.value,
  suffix: props.suffix ?? false,
}))

const isDisplay = computed(() => displayIndexList.value.includes(index.value))

const gridColumnAttribute = computed(() => {
  const { suffix, span } = itemData.value
  return suffix
    ? `${responsiveCols.value - span + 1} / span ${span}`
    : `span ${span} / span ${span}`
})

const marginLeftAttribute = computed(() => {
  const { span, offset } = itemData.value
  if (offset < 0)
    return
  const oneSpan = `(100% - ${responsiveXGap.value * (span - 1)}px) / ${span}`
  return `calc((${oneSpan} * ${offset}) + ${
    responsiveXGap.value * offset
  }px)`
})

const gridItemStyle = computed<CSSProperties>(() => ({
  'grid-column': gridColumnAttribute.value,
  'margin-left': marginLeftAttribute.value,
  'display': (!isDisplay.value || itemData.value.span === 0) ? 'none' : undefined,
}))

watchEffect(() => {
  if (index.value !== -1)
    setItemMap(index.value, itemData.value)
})

onUnmounted(() => {
  if (index.value !== -1)
    removeItemMap(index.value)
})
</script>

<template>
  <div
    ref="el"
    class="grid-item"
    :style="gridItemStyle"
  >
    <slot :overflow="isOverflow" />
  </div>
</template>

<style scoped>

</style>
