import type { GridItemProps } from '@/grid/types'
import type { DefineSchema } from '@/schema-form/types/common.ts'

export interface SchemaFormItemProps {
  schema: DefineSchema

  id: string

  index: number

  disabled?: boolean

  gridItemProps?: GridItemProps | number
}
