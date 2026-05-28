import type { ModelRef } from 'vue'
import type { SchemaFormCoreOptions } from '@/schema-form/core/types'
import type { SchemaFormCommonExpose, SchemaFormCommonProps } from '@/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared'
import { useProvideSchemaFormContext } from '@/schema-form/hooks/context.ts'
import useCommonExpose from '@/schema-form/hooks/expose.ts'
import useOmitProps from '@/utils/omit-props'

export function useSchemaFormController<TProps extends SchemaFormCommonProps>(
  props: TProps,
  model: ModelRef<Recordable>,
  slots: Record<string, any>,
  options: SchemaFormCoreOptions<TProps> = {},
) {
  useProvideSchemaFormContext(props, model)

  const { formRef, commonExpose } = useCommonExpose()
  const formProps = useOmitProps(props, options.omitFormProps || [])
  const formContentSlots = useOmitProps(slots, options.omitContentSlots || [])

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
