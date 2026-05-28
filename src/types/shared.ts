import type { MaybeRef } from 'vue'

export type Recordable<T = any> = Record<string, T>

export type WrapWithMaybeRef<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

