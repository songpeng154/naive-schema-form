import type { Ref } from 'vue'
import type { GridBreakpoints } from '@/config/types'
import type { ResponsiveValue } from '@/grid/types'
import type { Recordable } from '@/types/shared'
import { isObject } from 'es-toolkit/compat'
import { computed } from 'vue'

function responsivePropsValue<K extends Recordable>(
  width: Ref<number>,
  data: K,
  key: keyof K,
  breakpoints: GridBreakpoints,
) {
  const getResponsiveValue = (record: ResponsiveValue) => {
    const { xs, sm, md, lg, xl } = record
    const w = width.value
    // Start from the first declared breakpoint so sparse configs still resolve deterministically.
    let value = xs ?? sm ?? md ?? lg ?? xl

    if (w > breakpoints.xs && sm !== undefined)
      value = sm
    if (w >= breakpoints.md && md !== undefined)
      value = md
    if (w >= breakpoints.lg && lg !== undefined)
      value = lg
    if (w >= breakpoints.xl && xl !== undefined)
      value = xl

    return value
  }

  return computed(() => {
    const value = isObject(data[key]) ? getResponsiveValue(data[key]) : data[key]
    // Preserve explicit zero values and fall back to 0 only when the prop is actually missing.
    return typeof value === 'number' ? value : 0
  })
}

export default responsivePropsValue
