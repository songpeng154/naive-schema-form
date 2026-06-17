import type { SchemaFormLocale } from './types.ts'
import { enUS } from './enUS.ts'
import { zhCN } from './zhCN.ts'

export type { SchemaFormLocale } from './types.ts'

export function getLocale(localeName: string): SchemaFormLocale {
  if (localeName.startsWith('en'))
    return enUS
  return zhCN
}
