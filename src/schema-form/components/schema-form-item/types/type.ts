import type { GridItemProps } from '@/grid/types'
import type { NormalizedSchema } from '@/schema-form/core/types'

export interface SchemaFormItemProps {
  schema: NormalizedSchema

  id: string

  disabled?: boolean

  gridItemProps?: GridItemProps | number
}
