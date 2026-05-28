import type { ResolvedNaiveSchemaFormConfig } from '@/config/types'

export const DEFAULT_NAIVE_SCHEMA_FORM_CONFIG: Readonly<ResolvedNaiveSchemaFormConfig> = {
  grid: {
    breakpoints: {
      xs: 530,
      sm: 768,
      md: 992,
      lg: 1200,
      xl: 1920,
    },
    defaultProps: {
      cols: 24,
      notCollapsedRows: 1,
      responsive: 'self',
    },
    itemDefaultProps: {
      span: 1,
      offset: 0,
      suffix: false,
    },
  },
  schemaForm: {
    common: {
      autoPlaceholder: true,
      autoRequiredRule: true,
      autoLabelWidth: true,
      showActions: true,
      showLabel: true,
      showFeedback: true,
      showReset: true,
      submitText: '提交',
      resetText: '重置',
      defaultDateFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultTimeFormat: 'HH:mm:ss',
      defaultDateValueFormat: 'yyyy-MM-dd HH:mm:ss',
      defaultTimeValueFormat: 'HH:mm:ss',
    },
    base: {
      scrollToFirstError: true,
      labelOverflowOmitted: false,
      labelPlacement: 'top',
      gridProps: {
        cols: 24,
        yGap: 12,
      },
      gridItemProps: 24,
    },
    search: {
      labelAlign: 'right',
      labelPlacement: 'left',
      inline: true,
      submitText: '搜索',
      gridItemProps: {
        span: {
          xs: 24,
          sm: 12,
          md: 8,
          lg: 6,
          xl: 4,
        },
      },
      gridProps: {
        cols: 24,
        yGap: 12,
        responsive: 'self',
      },
      searchShowNumber: 3,
      enableCollapsed: true,
      collapsedText: '展开',
      expandedText: '收起',
    },
    group: {
      scrollToFirstError: true,
      labelOverflowOmitted: false,
      labelPlacement: 'top',
      gridProps: {
        cols: 24,
        yGap: 12,
      },
      gridItemProps: 24,
      collapsedText: '展开',
      expandedText: '收起',
      defaultCollapsed: true,
      defaultCollapsedRows: 2,
    },
    popup: {
      scrollToFirstError: true,
      labelOverflowOmitted: false,
      labelPlacement: 'top',
      gridProps: {
        cols: 24,
        yGap: 12,
      },
      gridItemProps: 24,
      type: 'drawer',
      maskClosable: true,
      resetOnClose: true,
      confirmOnClose: true,
      confirmTitle: '关闭提示',
      confirmContent: '您确定要关闭它吗？',
      drawerContentProps: {
        closable: true,
      },
    },
    componentProps: {},
  },
}
