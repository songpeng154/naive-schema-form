import type { ModelRef } from 'vue'
import type { SchemaFormCoreOptions } from '@/components/schema-form/core/types.ts'
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import { useProvideSchemaFormContext } from '@/components/schema-form/hooks/context.ts'
import useCommonExpose from '@/components/schema-form/hooks/expose.ts'
import useOmitProps from '@/utils/omit-props.ts'

/**
 * Schema 表单核心控制器，负责处理属性过滤、插槽分离并挂载 Context
 * @param props 表单组件的属性
 * @param model 双向绑定的表单数据
 * @param slots 组件的作用域插槽
 * @param options 额外的控制参数
 */
export function useSchemaFormController<TModel extends object, TProps extends SchemaFormCommonProps<TModel>>(
  props: TProps,
  model: ModelRef<TModel>,
  slots: Record<string, any>,
  options: SchemaFormCoreOptions<TProps> = {},
) {
  useProvideSchemaFormContext(props, model)

  const { formRef, commonExpose } = useCommonExpose()

  // 调用 register 回调，将 expose 注入给 schemaForm hook
  props.register?.(commonExpose as SchemaFormCommonExpose)

  // 始终从 formProps 中排除 register，避免传递给底层 NForm
  const formProps = useOmitProps(props, [...(options.omitFormProps || []), 'register'])
  const formContentSlots = useOmitProps(slots, [...(options.omitContentSlots || []), 'default'])

  return {
    formRef,
    commonExpose,
    formProps,
    formContentSlots,
  }
}

/**
 * 提供一种统一的方式去扩展和合并暴露出来的实例方法
 * @param commonExpose 基础暴露实例
 * @param extend 扩展的特有方法
 */
export function exposeSchemaForm<TExpose extends SchemaFormCommonExpose>(commonExpose: SchemaFormCommonExpose, extend?: Partial<TExpose>) {
  return {
    ...commonExpose,
    ...extend,
  } as TExpose
}
