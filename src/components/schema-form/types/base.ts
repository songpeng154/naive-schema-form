/* --------------基础表单-------------- */
import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
} from '@/components/schema-form/types/common.ts'

/**
 * 基础表单组件的 Props 类型
 */
export interface SchemaFormProps<TModel extends object = any> extends SchemaFormCommonProps<TModel> {
  /**
   * schema 配置
   */
  schema?: DefineSchema<TModel>[]
}

/**
 * 基础表单向外暴露的方法实例
 */
export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

/**
 * 基础表单支持的插槽定义
 */
export interface SchemaFormSlots extends SchemaFormCommonSlots {

}
