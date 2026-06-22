import type { SchemaFormLocale } from './types.ts'

/**
 * 英文国际化配置
 */
export const enUS: SchemaFormLocale = {
  name: 'en-US',
  placeholder: {
    input: (label) => label ? `Please input ${label}` : 'Please input',
    select: (label) => label ? `Please select ${label}` : 'Please select',
    dateRange: ['Start Date', 'End Date'],
    dateTimeRange: ['Start Date Time', 'End Date Time'],
  },
  rule: {
    required: (label) => label ? `${label} is required` : 'This field is required',
  },
  rulePresets: {
    mail: {
      requiredMessage: 'Please input email',
      incorrectMessage: 'Please input a valid email',
    },
    phone: {
      requiredMessage: 'Please input phone number',
      incorrectMessage: 'Please input a valid phone number',
    },
    landline: {
      requiredMessage: 'Please input landline number',
      incorrectMessage: 'Please input a valid landline number',
    },
    idCard: {
      requiredMessage: 'Please input ID card number',
      incorrectMessage: 'Please input a valid ID card number',
    },
    url: {
      requiredMessage: 'Please input URL',
      incorrectMessage: 'Please input a valid URL',
    },
  },
}
