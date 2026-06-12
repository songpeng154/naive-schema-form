import type { Ref } from 'vue'
import type { UseSearchSchemaFormArgs, UseSearchSchemaFormOptions, UseSearchSchemaFormReturn } from './types'
import type { DefineSchema, FieldPaths } from '@/components/schema-form/types/common'
import type { SearchSchemaFormExpose } from '@/components/schema-form/types/search'
import type { Recordable } from '@/types/shared'
import { reactive, ref } from 'vue'

/**
 * 查询表单 Hook，通过直接传入 schema 数组或配置 options 进行一站式管理
 *
 * @param initialModel - 初始 model 数据，必须是 Ref
 * @param optionsOrSchema - 直接传入的 schema 配置数组或完整配置 options
 *
 * @example
 * ```ts
 * // 1. 在 <script setup> 中定义 model 并调用 Hook
 * const model = ref({ keyword: '' })
 * const { register, validate } = useSearchSchemaForm(model, [
 *   {
 *     field: 'keyword',
 *     label: '关键字',
 *     component: 'input'
 *   }
 * ])
 *
 * // 2. 在 <template> 中绑定组件
 * <SearchSchemaForm v-bind="register" />
 * ```
 */
function useSearchSchemaForm<TModel extends Recordable>(
  initialModel: Ref<TModel>,
  optionsOrSchema: UseSearchSchemaFormArgs<TModel>,
): UseSearchSchemaFormReturn<TModel> {
  const model = initialModel

  const formInstance = ref<SearchSchemaFormExpose>()

  const registerCallback = (instance: SearchSchemaFormExpose) => {
    formInstance.value = instance
  }

  // 判断是否直接传入了 schema (数组类型)
  const isDirectSchema = Array.isArray(optionsOrSchema)

  const options: UseSearchSchemaFormOptions<TModel> = isDirectSchema
    ? { schema: optionsOrSchema as DefineSchema<TModel>[] }
    : (optionsOrSchema as UseSearchSchemaFormOptions<TModel>)

  const schema = ref<DefineSchema<TModel>[]>(options.schema || []) as Ref<DefineSchema<TModel>[]>

  // 排除掉 options 中的 schema，避免重复覆盖
  const { schema: _omittedSchema, ...restOptions } = options

  // register 对象：通过 v-bind 展开到 SearchSchemaForm 组件上
  const register = reactive({
    ...restOptions,
    model,
    schema,
    'onUpdate:model': (val: TModel) => { model.value = val },
    'onUpdate:schema': (val: DefineSchema<TModel>[]) => { schema.value = val },
    'register': registerCallback,
  }) as unknown as UseSearchSchemaFormReturn<TModel>['register']

  // 代理表单实例方法
  const validate: SearchSchemaFormExpose['validate'] = (...args) => {
    if (!formInstance.value)
      return Promise.reject(new Error('SearchSchemaForm: 表单实例未就绪，请确保组件已挂载'))
    return formInstance.value.validate(...args)
  }

  const restoreValidation: SearchSchemaFormExpose['restoreValidation'] = (...args) => {
    return formInstance.value?.restoreValidation?.(...args)
  }

  const resetFields: SearchSchemaFormExpose['resetFields'] = () => {
    return formInstance.value?.resetFields?.()
  }

  const scrollToField: SearchSchemaFormExpose['scrollToField'] = (field: FieldPaths<TModel>) => {
    return formInstance.value?.scrollToField?.(field)
  }

  const toggleCollapsed: SearchSchemaFormExpose['toggleCollapsed'] = (isCollapsed: boolean) => {
    return formInstance.value?.toggleCollapsed?.(isCollapsed)
  }

  return {
    register,
    model,
    schema,
    validate,
    resetFields,
    restoreValidation,
    scrollToField,
    toggleCollapsed,
  }
}

export default useSearchSchemaForm
