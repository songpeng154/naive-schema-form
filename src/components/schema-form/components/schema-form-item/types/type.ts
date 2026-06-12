import type { GridItemProps } from '@/components/grid/types'
import type { DefineSchema } from '@/components/schema-form/types/common.ts'

export interface SchemaFormItemProps {
  schema: DefineSchema

  id: string

  index: number

  disabled?: boolean

  gridItemProps?: GridItemProps | number
}
