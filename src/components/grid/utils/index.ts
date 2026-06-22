import type { GridItemData } from '@/components/grid/types'

/**
 * 解析计算栅格项的宽度、偏移等结构化信息
 * @param cols 当前环境的栅格列数
 * @param props 栅格项配置数据
 */
export function resolveItemData(cols: number, props: GridItemData): GridItemData {
  const originSpan = props.span ?? 1
  const originOffset = props.offset ?? 0
  const offset = Math.min(originOffset, cols)
  const span = Math.min(offset > 0 ? originSpan + originOffset : originSpan, cols)
  return {
    span,
    offset,
    suffix: 'suffix' in props ? props.suffix !== false : false,
  }
}

/**
 * 计算具有折叠功能的栅格环境中，哪些项应当显示或折叠，并判断是否产生溢出
 * @param cols 栅格总列数
 * @param collapsed 是否处于折叠状态
 * @param notCollapsedRows 允许不折叠展示的最大行数
 * @param itemDataList 每个栅格项的元数据集合
 */
export function setItemVisible(cols: number, collapsed: boolean, notCollapsedRows: number, itemDataList: GridItemData[]) {
  const isOverflow = (span: number) => Math.ceil(span / cols) > notCollapsedRows

  const getCollapsedDisplayIndexList = () => {
    const collapsedDisplayIndexList: number[] = []
    let spanSum = itemDataList.reduce((num, item, index) => {
      if (item.suffix) {
        num += item.span
        collapsedDisplayIndexList.push(index)
      }
      return num
    }, 0)

    for (let i = 0; i < itemDataList.length; i++) {
      const item = itemDataList[i]
      if (!item.suffix) {
        spanSum += item.span
        if (isOverflow(spanSum))
          break
        collapsedDisplayIndexList.push(i)
      }
    }
    return collapsedDisplayIndexList
  }

  const collapsedDisplayIndexList = getCollapsedDisplayIndexList()
  const displayIndexList = collapsed
    ? collapsedDisplayIndexList
    : itemDataList.map((_, index) => index)
  const overflow = itemDataList.some((item, index) => !item.suffix && !collapsedDisplayIndexList.includes(index))

  return { overflow, displayIndexList }
}
