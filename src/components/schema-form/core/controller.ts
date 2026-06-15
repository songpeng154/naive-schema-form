import type { ModelRef } from 'vue'
import type { SchemaFormCoreOptions } from '@/components/schema-form/core/types.ts'
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/components/schema-form/types/common.ts'
import { useProvideSchemaFormContext } from '@/components/schema-form/hooks/context.ts'
import useCommonExpose from '@/components/schema-form/hooks/expose.ts'
import useOmitProps from '@/utils/omit-props.ts'

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

export function exposeSchemaForm<TExpose extends SchemaFormCommonExpose>(commonExpose: SchemaFormCommonExpose, extend?: Partial<TExpose>) {
  return {
    ...commonExpose,
    ...extend,
  } as TExpose
}
