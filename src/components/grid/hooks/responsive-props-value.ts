import type { Ref } from 'vue'
import type { GridBreakpoints, ResponsiveValue } from '@/components/grid/types'
import { isObject } from 'es-toolkit/compat'
import { computed } from 'vue'

function responsivePropsValue<K extends object>(
  width: Ref<number>,
  data: K,
  key: keyof K,
  breakpoints: Partial<GridBreakpoints>,
) {
  const getResponsiveValue = (record: ResponsiveValue) => {
    const { xs, sm, md, lg, xl } = record
    const w = width.value
    /**
     * 从第一个声明的断点开始，确保稀疏配置也能确定性地解析。
     */
    let value = xs ?? sm ?? md ?? lg ?? xl

    if (breakpoints.xs && w > breakpoints.xs && sm !== undefined)
      value = sm
    if (breakpoints.md && w >= breakpoints.md && md !== undefined)
      value = md
    if (breakpoints.lg && w >= breakpoints.lg && lg !== undefined)
      value = lg
    if (breakpoints.xl && w >= breakpoints.xl && xl !== undefined)
      value = xl

    return value
  }

  return computed(() => {
    const value = isObject(data[key]) ? getResponsiveValue(data[key]) : data[key]
    /**
     * 保留显式的零值，仅在属性缺失时回退到 0。
     */
    return typeof value === 'number' ? value : 0
  })
}

export default responsivePropsValue
