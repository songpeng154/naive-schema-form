import type { GridProps } from '@/components/grid/types'
import type { DefineSchema, UnwrapSchema } from '@/components/schema-form/types/common.ts'

/**
 * 表单内容区域组件的 Props 类型
 */
export interface SchemaFormContent {
  schema: DefineSchema[] | UnwrapSchema[]

  gridProps: GridProps
}
