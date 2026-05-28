import type { Recordable } from '@/types/shared'
import { omit } from 'es-toolkit'
import { computed } from 'vue'

function useOmitProps<T extends Recordable, K extends keyof T>(value: T, keys: K[]) {
  return computed(() => omit(value, keys))
}

export default useOmitProps
