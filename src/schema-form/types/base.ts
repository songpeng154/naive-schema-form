/* --------------基础表单-------------- */
import type {
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
  DefineSchema,
} from '@/schema-form/types/common.ts'

export interface SchemaFormProps extends SchemaFormCommonProps {
  // schema 配置
  schema: DefineSchema[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {

}
