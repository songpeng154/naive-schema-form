/* --------------基础表单-------------- */
import type {
  DefineSchema,
  SchemaFormCommonExpose,
  SchemaFormCommonProps,
  SchemaFormCommonSlots,
} from '@/schema-form/types/common.ts'

export interface SchemaFormProps extends SchemaFormCommonProps {
  // schema 配置
  schema: DefineSchema[]
}

export interface SchemaFormExpose extends SchemaFormCommonExpose {
}

export interface SchemaFormSlots extends SchemaFormCommonSlots {

}
