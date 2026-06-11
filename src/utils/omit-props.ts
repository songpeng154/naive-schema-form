import type { MaybeRefOrGetter } from 'vue'
import type { Recordable } from '@/types/shared'
import { omit } from 'es-toolkit'
import { computed, toValue } from 'vue'

function useOmitProps<T extends Recordable, K extends keyof T>(value: MaybeRefOrGetter<T>, keys: K[]) {
  return computed(() => omit(toValue(value), keys))
}

export default useOmitProps
