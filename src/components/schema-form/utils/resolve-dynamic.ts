import type { MaybeRef } from 'vue'
import type { CallbackParams } from '@/components/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'
import { isFunction } from 'es-toolkit'
import { unref } from 'vue'

/**
 * 统一处理支持动态函数求值的属性。
 * 如果值是一个函数，将传入 callbackParams 并执行返回；否则直接返回该值。
 *
 * @param prop 静态值或回调函数
 * @param params 表单当前的 callbackParams
 */
export function resolveDynamicProp<T>(
  prop: T | ((params: CallbackParams) => T),
  params: CallbackParams,
): T {
  const unwrappedProp = unref(prop)
  return isFunction(unwrappedProp) ? unwrappedProp(params) : unwrappedProp
}

/**
 * 批量解包一个对象中所有属性的 Ref。
 * 等价于对每个 key 手动调用 unref(val)。
 *
 * 注意：当对象来自 reactive 数组内部时，Object.entries 会自动
 * 通过 Proxy getter 完成解包，此函数主要用于兼容非 reactive 场景。
 *
 * @param obj 可能包含 Ref 属性的对象，本身也可以是 MaybeRef
 */
export function unrefObject<T extends Recordable>(obj: MaybeRef<T | undefined | null>): T {
  const raw = unref(obj)
  if (!raw)
    return {} as T
  const result: Recordable = {}
  for (const [key, val] of Object.entries(raw)) {
    result[key] = unref(val)
  }
  return result as T
}
