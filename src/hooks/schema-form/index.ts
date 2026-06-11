import type { Ref } from 'vue'
import type { UseSchemaFormArgs, UseSchemaFormOptions, UseSchemaFormReturn } from './types.ts'
import type { DefineSchema, FieldPaths, SchemaFormCommonExpose } from '@/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'
import { ref } from 'vue'

/**
 * 表单 Hook，通过直接传入 schema 数组或配置 options 进行一站式管理
 *
 * @param initialModel - 初始 model 数据，必须是 Ref
 * @param optionsOrSchema - 直接传入的 schema 配置数组或完整配置 options
 *
 * @example
 * ```ts
 * // 1. 在 <script setup> 中定义 model 并调用 Hook
 * const model = ref({ name: '', age: 0 })
 * const { register, validate } = useSchemaForm(model, [
 *   {
 *     field: 'name',
 *     label: '姓名',
 *     component: 'input'
 *   }
 * ])
 *
 * // 2. 在 <template> 中绑定组件
 * <SchemaForm v-bind="register" />
 * ```
 */
function useSchemaForm<TModel extends Recordable>(
  initialModel: Ref<TModel>,
  optionsOrSchema: UseSchemaFormArgs<TModel>,
): UseSchemaFormReturn<TModel> {
  const model = initialModel

  const formInstance = ref<SchemaFormCommonExpose>()

  const registerCallback = (instance: SchemaFormCommonExpose) => {
    formInstance.value = instance
  }

  // 判断是否直接传入了 schema (数组类型)
  const isDirectSchema = Array.isArray(optionsOrSchema)

  const options: UseSchemaFormOptions<TModel> = isDirectSchema
    ? { schema: optionsOrSchema as DefineSchema<TModel>[] }
    : (optionsOrSchema as UseSchemaFormOptions<TModel>)

  const schema = ref<DefineSchema<TModel>[]>(options.schema || []) as Ref<DefineSchema<TModel>[]>

  // 排除掉 options 中的 schema，避免重复覆盖
  const { schema: _omittedSchema, ...restOptions } = options

  // register 对象：通过 v-bind 展开到 SchemaForm 组件上
  const register = {
    ...restOptions,
    get 'model'() {
      return model.value
    },
    set 'model'(val) {
      model.value = val
    },
    'onUpdate:model': (val: TModel) => { model.value = val },
    get 'schema'() {
      return schema.value
    },
    set 'schema'(val) {
      schema.value = val
    },
    'onUpdate:schema': (val: DefineSchema<TModel>[]) => { schema.value = val },
    'register': registerCallback,
  } as unknown as UseSchemaFormReturn<TModel>['register']

  // 代理表单实例方法
  const validate: SchemaFormCommonExpose['validate'] = (...args) => {
    if (!formInstance.value)
      return Promise.reject(new Error('SchemaForm: 表单实例未就绪，请确保组件已挂载'))
    return formInstance.value.validate(...args)
  }

  const restoreValidation: SchemaFormCommonExpose['restoreValidation'] = (...args) => {
    return formInstance.value?.restoreValidation?.(...args)
  }

  const resetFields: SchemaFormCommonExpose['resetFields'] = () => {
    return formInstance.value?.resetFields?.()
  }

  const scrollToField: SchemaFormCommonExpose['scrollToField'] = (field: FieldPaths<TModel>) => {
    return formInstance.value?.scrollToField?.(field)
  }

  return {
    register,
    model,
    schema,
    validate,
    resetFields,
    restoreValidation,
    scrollToField,
  }
}

export default useSchemaForm
