/* --------------基础表单-------------- */
import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
} from '@/components/schema-form/types/common.ts'

export interface SchemaFormProps<TModel extends object = any> extends SchemaFormCommonProps<TModel> {
  /**
   * schema 配置
   */
  schema?: DefineSchema<TModel>[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {

}
