import type { ResponsiveValue } from '@/grid/types'
import type { Recordable } from '@/types/shared'
import type { Ref } from 'vue'
import { isObject } from 'es-toolkit/compat'
import { computed } from 'vue'

const DEFAULT_BREAKPOINTS = {
  xs: 530,
  sm: 768,
  md: 992,
  lg: 1200,
  xl: 1920,
}
/*
* 响应式道具值
* xs < 530
* sm > xs || sm > 730
* md >= 992
* lg >= 1200
* xl >= 1920
* */
function responsivePropsValue<K extends Recordable>(width: Ref<number>, data: K, key: keyof K) {
  const getResponsiveValue = (record: ResponsiveValue) => {
    const b = DEFAULT_BREAKPOINTS
    const { xs, sm, md, lg, xl } = record
    const w = width.value
    if (xs && w <= b.xs)
      return xs
    let v: any
    if (sm && (w > b.xs || w >= b.sm))
      v = sm
    if (md && w >= b.md)
      v = md
    if (lg && w >= b.lg)
      v = lg
    if (xl && w >= b.xl)
      v = xl
    return v
  }

  return computed(() => Number(isObject(data[key]) ? getResponsiveValue(data[key]) : data[key]))
}

export default responsivePropsValue
