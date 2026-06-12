import type { GridItemProps, GridProps } from '@/components/grid/types'
import type { DefineSchema, UnwrapSchema } from '@/components/schema-form/types/common.ts'

export interface SchemaFormContent {
  schema: DefineSchema[] | UnwrapSchema[]

  gridProps: GridProps

  gridItemProps?: number | GridItemProps

  disabled?: boolean
}
