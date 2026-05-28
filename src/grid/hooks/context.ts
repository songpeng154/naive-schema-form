import type { GridItemData, GridProps } from '@/grid/types'
import { createInjectionState, useElementSize, useWindowSize } from '@vueuse/core'
import { computed, reactive, ref } from 'vue'
import { useNaiveSchemaFormConfig } from '@/config/context'
import responsivePropsValue from '@/grid/hooks/responsive-props-value.ts'

const [useProvideGridContext, useGridContext] = createInjectionState((props: GridProps) => {
  const config = useNaiveSchemaFormConfig()
  const rowEl = ref<HTMLElement>()
  const isOverflow = ref(false)
  const displayIndexList = ref<number[]>([])
  const itemDataMap = reactive<Map<number, GridItemData>>(new Map())

  const { width: elWidth } = useElementSize(rowEl)
  const { width: windowsWidth } = useWindowSize()

  const width = computed(() => props.responsive === 'screen' ? windowsWidth.value : elWidth.value)
  const itemDataList = computed<GridItemData[]>(() => Array.from(itemDataMap.entries()).map(([, itemData]) => itemData))

  const responsiveCols = responsivePropsValue(width, props, 'cols', config.grid.breakpoints)
  const responsiveXGap = responsivePropsValue(width, props, 'xGap', config.grid.breakpoints)
  const responsiveYGap = responsivePropsValue(width, props, 'yGap', config.grid.breakpoints)

  const setItemMap = (index: number, itemProps: GridItemData) => {
    itemDataMap.set(index, itemProps)
  }
  const removeItemMap = (index: number) => {
    itemDataMap.delete(index)
  }

  return {
    props,
    rowEl,
    isOverflow,
    displayIndexList,
    width,
    itemDataMap,
    itemDataList,
    responsiveCols,
    responsiveXGap,
    responsiveYGap,
    setItemMap,
    removeItemMap,
  }
})

export { useGridContext, useProvideGridContext }
