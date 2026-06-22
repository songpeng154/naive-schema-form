import type { DefineSchema } from '@/components/schema-form/types/common.ts'

/**
 * 内部单个表单项 SchemaFormItem 的 Props 类型
 */
export interface SchemaFormItemProps {
  schema: DefineSchema

  id: string

  index: number
}
