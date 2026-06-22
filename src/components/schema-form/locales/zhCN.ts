import type { SchemaFormLocale } from './types.ts'

/**
 * 中文国际化配置
 */
export const zhCN: SchemaFormLocale = {
  name: 'zh-CN',
  placeholder: {
    input: (label) => `请输入${label}`,
    select: (label) => `请选择${label}`,
    dateRange: ['开始日期', '结束日期'],
    dateTimeRange: ['开始日期时间', '结束日期时间'],
  },
  rule: {
    required: (label) => label ? `${label}是必填项` : '该字段是必填项',
  },
  rulePresets: {
    mail: {
      requiredMessage: '请输入邮箱',
      incorrectMessage: '请输入合法邮箱',
    },
    phone: {
      requiredMessage: '请输入手机号',
      incorrectMessage: '请输入合法手机号',
    },
    landline: {
      requiredMessage: '请输入固定电话',
      incorrectMessage: '请输入合法固定电话',
    },
    idCard: {
      requiredMessage: '请输入身份证',
      incorrectMessage: '请输入合法身份证',
    },
    url: {
      requiredMessage: '请输入网址',
      incorrectMessage: '请输入合法网址',
    },
  },
}
