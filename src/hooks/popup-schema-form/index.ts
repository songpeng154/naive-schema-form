import type { Ref } from 'vue'
import type { UsePopupSchemaFormArgs, UsePopupSchemaFormOptions, UsePopupSchemaFormReturn } from './types'
import type { DefineSchema, FieldPaths } from '@/components/schema-form/types/common'
import type { PopupSchemaFormExpose } from '@/components/schema-form/types/popup'
import { reactive, ref } from 'vue'

/**
 * 弹窗表单 Hook，通过直接传入 schema 数组或配置 options 进行一站式管理
 *
 * @param initialModel - 初始 model 数据，必须是 Ref
 * @param optionsOrSchema - 直接传入的 schema 配置数组或完整配置 options
 *
 * @example
 * ```ts
 * // 1. 在 <script setup> 中定义 model 并调用 Hook
 * const model = ref({ name: '' })
 * const { register, open, close } = usePopupSchemaForm(model, [
 *   {
 *     field: 'name',
 *     label: '姓名',
 *     component: 'input'
 *   }
 * ])
 *
 * // 2. 在 <template> 中绑定组件
 * <PopupSchemaForm v-bind="register" />
 * ```
 */
function usePopupSchemaForm<TModel extends object = any>(
  initialModel: Ref<TModel>,
  optionsOrSchema: UsePopupSchemaFormArgs<TModel>,
): UsePopupSchemaFormReturn<TModel> {
  const model = initialModel

  const formInstance = ref<PopupSchemaFormExpose>()

  // 内置可见性管理
  const visible = ref(false)

  const registerCallback = (instance: PopupSchemaFormExpose) => {
    formInstance.value = instance
  }

  // 判断是否直接传入了 schema (数组类型)
  const isDirectSchema = Array.isArray(optionsOrSchema)

  const options: UsePopupSchemaFormOptions<TModel> = isDirectSchema
    ? { schema: optionsOrSchema as DefineSchema<TModel>[] }
    : (optionsOrSchema as UsePopupSchemaFormOptions<TModel>)

  const schema = ref<DefineSchema<TModel>[]>(options.schema || []) as Ref<DefineSchema<TModel>[]>

  // 排除掉 options 中的 schema，避免重复覆盖
  const { schema: _omittedSchema, ...restOptions } = options

  // register 对象：通过 v-bind 展开到 PopupSchemaForm 组件上
  const register = reactive({
    ...restOptions,
    model,
    schema,
    visible,
    'onUpdate:model': (val: TModel) => { model.value = val },
    'onUpdate:schema': (val: DefineSchema<TModel>[]) => { schema.value = val },
    'onUpdate:visible': (val: boolean) => { visible.value = val },
    'register': registerCallback,
  }) as unknown as UsePopupSchemaFormReturn<TModel>['register']

  // 代理表单实例方法
  const validate: PopupSchemaFormExpose['validate'] = (...args) => {
    if (!formInstance.value)
      return Promise.reject(new Error('PopupSchemaForm: 表单实例未就绪，请确保组件已挂载'))
    return formInstance.value.validate(...args)
  }

  const restoreValidation: PopupSchemaFormExpose['restoreValidation'] = (...args) => {
    return formInstance.value?.restoreValidation?.(...args)
  }

  const resetFields: PopupSchemaFormExpose['resetFields'] = () => {
    return formInstance.value?.resetFields?.()
  }

  const scrollToField: PopupSchemaFormExpose['scrollToField'] = (field: FieldPaths<TModel>) => {
    return formInstance.value?.scrollToField?.(field as string)
  }

  const open = () => {
    visible.value = true
  }

  const close = () => {
    visible.value = false
  }

  const toggle = (_visible?: boolean) => {
    visible.value = _visible ?? !visible.value
  }

  return {
    register,
    model,
    schema,
    visible,
    open,
    close,
    toggle,
    validate,
    resetFields,
    restoreValidation,
    scrollToField,
  }
}

export default usePopupSchemaForm
