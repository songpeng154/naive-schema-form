import type { MaybeRef, Ref } from 'vue'

/**
 * 任意类型的键值对对象
 */
export type Recordable<T = any> = Record<string, T>

/**
 * 可以是普通值、Ref 或只读的 Ref
 */
export type MaybeReadonlyRef<T> = MaybeRef<T> | Readonly<Ref<T>>

/**
 * 将对象的每个属性包装为可能是响应式引用的类型 (MaybeRef)
 */
export type WrapWithMaybeRef<T> = {
  [K in keyof T]: MaybeRef<T[K]>
}

/**
 * 响应式断点类型，常用于网格系统布局
 */
export type BreakpointType = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
