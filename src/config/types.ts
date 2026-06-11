import type { GridBreakpoints } from '@/grid/types'
import type { SchemaFormProps } from '@/schema-form/types/base.ts'
import type { SchemaComponentPropsMap } from '@/schema-form/types/component.ts'
import type { GroupSchemaFormProps } from '@/schema-form/types/group.ts'
import type { PopupSchemaFormProps } from '@/schema-form/types/popup.ts'
import type { SearchSchemaFormProps } from '@/schema-form/types/search.ts'

/**
 * `SchemaForm` 的全局默认属性。
 */
export type BaseSchemaFormGlobalProps = Partial<Omit<SchemaFormProps, 'model' | 'schema'>>
/**
 * `SearchSchemaForm` 的全局默认属性。
 */
export type SearchSchemaFormGlobalProps = Partial<Omit<SearchSchemaFormProps, 'model' | 'schema' | 'collapsed'>>
/**
 * `GroupSchemaForm` 的全局默认属性。
 */
export type GroupSchemaFormGlobalProps = Partial<Omit<GroupSchemaFormProps, 'model' | 'schema'>>
/**
 * `PopupSchemaForm` 的全局默认属性。
 */
export type PopupSchemaFormGlobalProps = Partial<Omit<PopupSchemaFormProps, 'model' | 'schema' | 'visible'>>

/**
 * 所有模式表单组件及内置模式组件属性的全局默认配置。
 */
export interface SchemaFormGlobalConfig {
  /**
   * `SchemaForm` 的变体专有默认属性。
   */
  base?: BaseSchemaFormGlobalProps
  /**
   * `SearchSchemaForm` 的变体专有默认属性。
   */
  search?: SearchSchemaFormGlobalProps
  /**
   * `GroupSchemaForm` 的变体专有默认属性。
   */
  group?: GroupSchemaFormGlobalProps
  /**
   * `PopupSchemaForm` 的变体专有默认属性。
   */
  popup?: PopupSchemaFormGlobalProps
  /**
   * 内置模式组件（如 `input` 和 `select`）的默认 `componentProps`。
   */
  componentProps?: Partial<SchemaComponentPropsMap>
}

/**
 * 插件和提供者辅助函数接收的应用级配置对象。
 */
export interface NaiveSchemaFormConfig {
  /**
   * 全局栅格默认配置。
   */
  breakpoints?: Partial<GridBreakpoints>
  /**
   * 全局模式表单默认配置。
   */
  schemaForm?: SchemaFormGlobalConfig
}
