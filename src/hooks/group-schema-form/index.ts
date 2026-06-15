import type { Ref } from 'vue'
import type { UseGroupSchemaFormArgs, UseGroupSchemaFormOptions, UseGroupSchemaFormReturn } from './types'
import type { FieldPaths } from '@/components/schema-form/types/common.ts'
import type { DefineGroupSchema, GroupSchemaFormExpose } from '@/components/schema-form/types/group'
import { reactive, ref } from 'vue'

/**
 * 分组表单 Hook，通过直接传入 schema 数组或配置 options 进行一站式管理
 *
 * @param initialModel - 初始 model 数据，必须是 Ref
 * @param optionsOrSchema - 直接传入的分组 schema 配置数组或完整配置 options
 *
 * @example
 * ```ts
 * // 1. 在 <script setup> 中定义 model 并调用 Hook
 * const model = ref({ name: '', detail: '' })
 * const { register, validate } = useGroupSchemaForm(model, [
 *   {
 *     title: '基本信息',
 *     schema: [
 *       {
 *         field: 'name',
 *         label: '姓名',
 *         component: 'input'
 *       }
 *     ]
 *   }
 * ])
 *
 * // 2. 在 <template> 中绑定组件
 * <GroupSchemaForm v-bind="register" />
 * ```
 */
function useGroupSchemaForm<TModel extends object = any>(
  initialModel: Ref<TModel>,
  optionsOrSchema: UseGroupSchemaFormArgs<TModel>,
): UseGroupSchemaFormReturn<TModel> {
  const model = initialModel

  const formInstance = ref<GroupSchemaFormExpose>()

  const registerCallback = (instance: GroupSchemaFormExpose) => {
    formInstance.value = instance
  }

  // 判断是否直接传入了 schema (数组类型)
  const isDirectSchema = Array.isArray(optionsOrSchema)

  const options: UseGroupSchemaFormOptions<TModel> = isDirectSchema
    ? { schema: optionsOrSchema as DefineGroupSchema<TModel>[] }
    : (optionsOrSchema as UseGroupSchemaFormOptions<TModel>)

  const schema = ref<DefineGroupSchema<TModel>[]>(options.schema || []) as Ref<DefineGroupSchema<TModel>[]>

  // 排除掉 options 中的 schema，避免重复覆盖
  const { schema: _omittedSchema, ...restOptions } = options

  // register 对象：通过 v-bind 展开到 GroupSchemaForm 组件上
  const register = reactive({
    ...restOptions,
    model,
    schema,
    'onUpdate:model': (val: TModel) => { model.value = val },
    'onUpdate:schema': (val: DefineGroupSchema<TModel>[]) => { schema.value = val },
    'register': registerCallback,
  }) as unknown as UseGroupSchemaFormReturn<TModel>['register']

  // 代理表单实例方法
  const validate: GroupSchemaFormExpose['validate'] = (...args) => {
    if (!formInstance.value)
      return Promise.reject(new Error('GroupSchemaForm: 表单实例未就绪，请确保组件已挂载'))
    return formInstance.value.validate(...args)
  }

  const restoreValidation: GroupSchemaFormExpose['restoreValidation'] = (...args) => {
    return formInstance.value?.restoreValidation?.(...args)
  }

  const resetFields: GroupSchemaFormExpose['resetFields'] = () => {
    return formInstance.value?.resetFields?.()
  }

  const scrollToField: GroupSchemaFormExpose['scrollToField'] = (field: FieldPaths<TModel>) => {
    return formInstance.value?.scrollToField?.(field as string)
  }

  const toggleCollapsed: GroupSchemaFormExpose['toggleCollapsed'] = (index: number, isCollapsed?: boolean) => {
    return formInstance.value?.toggleCollapsed?.(index, isCollapsed)
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

export default useGroupSchemaForm
