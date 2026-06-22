import type { SchemaFormLocale } from './types.ts'
import { enUS } from './enUS.ts'
import { zhCN } from './zhCN.ts'

export type { SchemaFormLocale } from './types.ts'

/**
 * 根据语言名称获取对应的国际化配置对象
 * @param localeName 语言标识（如 zh-CN, en-US）
 */
export function getLocale(localeName: string): SchemaFormLocale {
  if (localeName.startsWith('en'))
    return enUS
  return zhCN
}
