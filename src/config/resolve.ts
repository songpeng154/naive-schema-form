import type { SchemaFormVariant } from '@/config/types'
import type { GridItemProps, GridProps } from '@/grid/types'
import type { SchemaFormCommonProps } from '@/schema-form/types/common.ts'
import type { SchemaComponentName, SchemaComponentPropsMap } from '@/schema-form/types/component.ts'
import type { Recordable } from '@/types/shared'
import { getCurrentInstance, reactive, watchEffect } from 'vue'
import { useNaiveSchemaFormConfig } from '@/config/context'
import { mergeConfig } from '@/config/utils'

function camelize(value: string) {
  return value.replace(/-(\w)/g, (_, char: string) => char.toUpperCase())
}

function getPassedProps<T extends Recordable>(rawProps: T): Partial<T> {
  const instance = getCurrentInstance()
  const vnodeProps = instance?.vnode.props ?? {}
  const result: Partial<T> = {}

  for (const key of Object.keys(vnodeProps)) {
    const normalizedKey = camelize(key)
    if (!(normalizedKey in rawProps))
      continue
    result[normalizedKey as keyof T] = rawProps[normalizedKey as keyof T]
  }

  return result
}

function syncReactiveObject<T extends Recordable>(target: T, source: T) {
  for (const key of Object.keys(target)) {
    if (!(key in source))
      delete target[key]
  }

  Object.assign(target, source)
}

function useResolvedObject<T extends Recordable>(resolver: () => T): T {
  const state = reactive({} as T) as T
  /**
   * 保持响应式对象引用稳定，
   * 使得组件中解构后的变量仍能响应配置变化。
   */
  syncReactiveObject(state, resolver())

  watchEffect(() => {
    syncReactiveObject(state, resolver())
  })

  return state as T
}

export function useResolvedGridProps(rawProps: GridProps) {
  const config = useNaiveSchemaFormConfig()

  return useResolvedObject(() => mergeConfig<GridProps>({}, config.grid.defaultProps, getPassedProps(rawProps)))
}

export function useResolvedGridItemProps(rawProps: GridItemProps) {
  const config = useNaiveSchemaFormConfig()

  return useResolvedObject(() => mergeConfig<GridItemProps>({}, config.grid.itemDefaultProps, getPassedProps(rawProps)))
}

export function useResolvedSchemaFormProps<TProps extends SchemaFormCommonProps>(variant: SchemaFormVariant, rawProps: TProps) {
  const config = useNaiveSchemaFormConfig()

  /**
   * 优先级：通用默认 < 变体默认 < 实例传入的属性
   */
  return useResolvedObject(() => mergeConfig<TProps>(
    {},
    config.schemaForm.common as Partial<TProps>,
    config.schemaForm[variant] as Partial<TProps>,
    getPassedProps(rawProps),
  ))
}

export function resolveSchemaComponentProps(
  componentName: SchemaComponentName | string | undefined,
  componentProps: Recordable | undefined,
  globalComponentProps: Partial<SchemaComponentPropsMap> = {},
) {
  /**
   * Schema 局部的 componentProps 始终优先于库级别的组件默认值。
   */
  const defaults = componentName
    ? globalComponentProps[componentName as SchemaComponentName] as Recordable | undefined
    : undefined

  return mergeConfig<Recordable>({}, defaults, componentProps)
}
