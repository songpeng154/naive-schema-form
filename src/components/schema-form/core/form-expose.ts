import type { SchemaFormExposeControllerOptions } from '@/components/schema-form/core/types.ts'
import type { SchemaFormCommonExpose } from '@/components/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'
import { cloneDeep } from 'es-toolkit'
import { useSchemaFormContext } from '@/components/schema-form/hooks/context.ts'

function replaceReactiveObject(target: Recordable, source: Recordable) {
  Object.keys(target).forEach((key) => {
    delete target[key]
  })
  Object.assign(target, source)
}

export function useSchemaFormExposeController(options: SchemaFormExposeControllerOptions) {
  const { props, formRef } = options
  const { model, formItemData } = useSchemaFormContext()!
  const initialModel = cloneDeep(model.value)

  // 滚动到目标字段
  function scrollToField(field: string) {
    console.log(formItemData)
    const target = Object.entries(formItemData)
      .map(([,value]) => value)
      .find(value => value.field === field)

    if (!target)
      return console.error(`目标字段不存在：${field}`)

    console.log(target)

    target.el.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    })
  }

  function restoreValidation() {
    formRef.value?.restoreValidation()
  }

  function resetFields() {
    replaceReactiveObject(model.value, cloneDeep(initialModel))
    restoreValidation()
  }

  async function validate(...args: Parameters<SchemaFormCommonExpose['validate']>) {
    const form = formRef.value
    if (!form)
      return Promise.reject(new Error('SchemaForm: form instance is not ready.'))
    const [callback, shouldRuleBeApplied] = args

    return form.validate((errors, extra) => {
      callback?.(errors, extra)
      if (props.scrollToFirstError) {
        const firstFailedField = errors?.[0]?.[0]?.field
        firstFailedField && scrollToField(firstFailedField)
      }
    }, shouldRuleBeApplied)
  }

  return {
    validate,
    restoreValidation,
    resetFields,
    scrollToField,
  } as SchemaFormCommonExpose
}
