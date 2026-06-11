/* --------------基础表单-------------- */
import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
} from '@/schema-form/types/common.ts'
import type { Recordable } from '@/types/shared.ts'

export interface SchemaFormProps<TModel extends Recordable = Recordable> extends SchemaFormCommonProps<TModel> {
  /**
   * schema 配置
   */
  schema: DefineSchema<TModel>[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {

}
