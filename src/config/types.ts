import type { GridItemProps, GridProps } from '@/grid/types'
import type { SchemaFormProps } from '@/schema-form/types/base.ts'
import type { SchemaFormCommonProps } from '@/schema-form/types/common.ts'
import type { SchemaComponentPropsMap } from '@/schema-form/types/component.ts'
import type { GroupSchemaFormProps } from '@/schema-form/types/group.ts'
import type { PopupSchemaFormProps } from '@/schema-form/types/popup.ts'
import type { SearchSchemaFormProps } from '@/schema-form/types/search.ts'

/**
 * Built-in schema-form variants that can read variant-specific global defaults.
 */
export type SchemaFormVariant = 'base' | 'search' | 'group' | 'popup'

/**
 * Responsive breakpoint thresholds used by the grid system.
 */
export interface GridBreakpoints {
  /** Max width bucket for extra-small layouts. */
  xs: number
  /** Small layout threshold. */
  sm: number
  /** Medium layout threshold. */
  md: number
  /** Large layout threshold. */
  lg: number
  /** Extra-large layout threshold. */
  xl: number
}

/**
 * Global defaults for the standalone grid components.
 */
export interface GridGlobalConfig {
  /** Override the default breakpoint thresholds used by responsive grid props. */
  breakpoints?: Partial<GridBreakpoints>
  /** Default props applied to every `Grid` instance before local props are merged in. */
  defaultProps?: Partial<Omit<GridProps, 'collapsed'>>
  /** Default props applied to every `GridItem` instance before local props are merged in. */
  itemDefaultProps?: Partial<GridItemProps>
}

/**
 * Shared schema-form defaults applied to all schema-form variants.
 */
export type CommonSchemaFormGlobalProps = Partial<Omit<SchemaFormCommonProps, 'model'>>
/** Global defaults for `SchemaForm`. */
export type BaseSchemaFormGlobalProps = Partial<Omit<SchemaFormProps, 'model' | 'schema'>>
/** Global defaults for `SearchSchemaForm`. */
export type SearchSchemaFormGlobalProps = Partial<Omit<SearchSchemaFormProps, 'model' | 'schema' | 'collapsed'>>
/** Global defaults for `GroupSchemaForm`. */
export type GroupSchemaFormGlobalProps = Partial<Omit<GroupSchemaFormProps, 'model' | 'schema'>>
/** Global defaults for `PopupSchemaForm`. */
export type PopupSchemaFormGlobalProps = Partial<Omit<PopupSchemaFormProps, 'model' | 'schema' | 'visible'>>

/**
 * Global defaults for all schema-form components and built-in schema component props.
 */
export interface SchemaFormGlobalConfig {
  /** Shared defaults merged into every schema-form variant first. */
  common?: CommonSchemaFormGlobalProps
  /** Variant-specific defaults for `SchemaForm`. */
  base?: BaseSchemaFormGlobalProps
  /** Variant-specific defaults for `SearchSchemaForm`. */
  search?: SearchSchemaFormGlobalProps
  /** Variant-specific defaults for `GroupSchemaForm`. */
  group?: GroupSchemaFormGlobalProps
  /** Variant-specific defaults for `PopupSchemaForm`. */
  popup?: PopupSchemaFormGlobalProps
  /** Default `componentProps` for built-in schema components such as `input` and `select`. */
  componentProps?: Partial<SchemaComponentPropsMap>
}

/**
 * App-level configuration object accepted by the plugin and provider helpers.
 */
export interface NaiveSchemaFormConfig {
  /** Global grid defaults. */
  grid?: GridGlobalConfig
  /** Global schema-form defaults. */
  schemaForm?: SchemaFormGlobalConfig
}

/**
 * Fully merged grid config after library defaults and app overrides are resolved.
 */
export interface ResolvedGridGlobalConfig {
  breakpoints: GridBreakpoints
  defaultProps: Partial<Omit<GridProps, 'collapsed'>>
  itemDefaultProps: Partial<GridItemProps>
}

/**
 * Fully merged schema-form config after library defaults and app overrides are resolved.
 */
export interface ResolvedSchemaFormGlobalConfig {
  common: CommonSchemaFormGlobalProps
  base: BaseSchemaFormGlobalProps
  search: SearchSchemaFormGlobalProps
  group: GroupSchemaFormGlobalProps
  popup: PopupSchemaFormGlobalProps
  componentProps: Partial<SchemaComponentPropsMap>
}

/**
 * Internal normalized config shape consumed at runtime.
 */
export interface ResolvedNaiveSchemaFormConfig {
  grid: ResolvedGridGlobalConfig
  schemaForm: ResolvedSchemaFormGlobalConfig
}
