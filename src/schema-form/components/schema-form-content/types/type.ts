import type { GridItemProps, GridProps } from '@/grid/types'
import type { NormalizedSchema } from '@/schema-form/core/types'
import type { DefineSchema, UnwrapSchema } from '@/schema-form/types/common.ts'

export interface SchemaFormContent {
  schema: DefineSchema[] | UnwrapSchema[] | NormalizedSchema[]

  gridProps: GridProps

  gridItemProps?: number | GridItemProps

  disabled?: boolean
}
