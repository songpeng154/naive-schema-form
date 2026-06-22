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

  function getScrollParent(node: HTMLElement | null): HTMLElement | null {
    if (!node || node === document.body || node === document.documentElement) {
      return null
    }
    if (node.scrollHeight > node.clientHeight) {
      const overflowY = window.getComputedStyle(node).overflowY
      if (overflowY === 'auto' || overflowY === 'scroll' || overflowY === 'overlay') {
        return node
      }
    }
    return getScrollParent(node.parentElement)
  }

  // 滚动到目标字段
  function scrollToField(field: string) {
    const target = Object.entries(formItemData)
      .map(([,value]) => value)
      .find(value => value.field === field)

    if (!target)
      return console.error(`目标字段不存在：${field}`)

    const scrollParent = getScrollParent(target.el)
    if (scrollParent) {
      const targetRect = target.el.getBoundingClientRect()
      const parentRect = scrollParent.getBoundingClientRect()
      const offset = targetRect.top - parentRect.top
      scrollParent.scrollBy({ top: offset, behavior: 'smooth' })
    } else {
      // 如果没有独立的滚动父容器，则退化使用原生 API
      target.el.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
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
