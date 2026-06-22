import type { BreakpointType } from '@/types/shared.ts'

/**
 * 响应式模式
 * 'self' 根据自身宽度进行响应式布局
 * 'screen' 根据屏幕断点进行响应式布局
 */
export type RowResponsive = 'self' | 'screen'

/**
 * 响应式属性值，支持基于 BreakpointType 提供不同断点下的不同值
 */
export type ResponsiveValue<K extends number = number> = Partial<Record<BreakpointType, K>>

/**
 * 栅格系统使用的响应式断点阈值。
 */
export interface GridBreakpoints {
  /**
   * 超小布局的最大宽度。
   */
  xs: number
  /**
   * 单独小布局阈值。
   */
  sm: number
  /**
   * 中等布局阈值。
   */
  md: number
  /**
   * 大布局阈值。
   */
  lg: number
  /**
   * 超大布局阈值。
   */
  xl: number
}

/**
 * 栅格容器 Grid 的 Props 类型
 */
export interface GridProps {
  /**
   * 列数量，默认 24
   */
  cols?: number | ResponsiveValue

  /**
   * 是否折叠
   */
  collapsed?: boolean

  /**
   * 折叠时显示的行数
   */
  notCollapsedRows?: number

  /**
   * 响应式模式
   * 'self' 根据自身宽度进行响应式布局
   * 'screen' 根据屏幕断点进行响应式布局
   */
  responsive?: RowResponsive

  /**
   * X 间距
   */
  xGap?: number | ResponsiveValue

  /**
   * Y 间距
   */
  yGap?: number | ResponsiveValue

  /**
   * 栅格系统使用的响应式断点阈值
   */
  breakpoints?: Partial<GridBreakpoints>
}

/**
 * 栅格项 GridItem 的 Props 类型
 */
export interface GridItemProps {
  /**
   * 栅格占据的列数
   * 为 0 时会隐藏，大于 Grid cols 数量时会错位，默认 1
   */
  span?: number | ResponsiveValue

  /**
   * 左侧的间隔格数
   */
  offset?: number | ResponsiveValue

  /**
   * 栅格后缀（不会被折叠）
   */
  suffix?: boolean
}

/**
 * 栅格项在计算和注入时的内部数据结构
 */
export interface GridItemData {
  span: number

  offset: number

  suffix: boolean
}
