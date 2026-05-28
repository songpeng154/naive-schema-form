import type { FormItemRule } from 'naive-ui'
import type { DefineSchema } from '../../../src'
import { reactive } from 'vue'

export const validationModel = reactive({
  name: '',
  email: '',
  phone: '',
  landline: '',
  idCard: '',
  url: '',
  password: '',
  confirmPassword: '',
  accept: false,
})

export const validationRules = {
  password: {
    required: true,
    min: 6,
    message: '密码至少 6 位',
    trigger: 'blur',
  } satisfies FormItemRule,
  confirmPassword: {
    required: true,
    trigger: ['blur', 'input'],
    validator: (_rule: FormItemRule, value: string) => {
      if (!value)
        return new Error('请再次输入密码')
      if (value !== validationModel.password)
        return new Error('两次密码不一致')
      return true
    },
  } satisfies FormItemRule,
  accept: {
    validator: (_rule: FormItemRule, value: boolean) => value || new Error('需要勾选协议'),
    trigger: 'change',
  } satisfies FormItemRule,
}

// Prefer reactive schema arrays so exported demo types stay portable in declaration emit.
export const validationSchema = reactive<DefineSchema<typeof validationModel>[]>([
  { field: 'name', label: '姓名', component: 'input', showRequireMark: true, gridItemProps: { span: 8 } },
  { field: 'email', label: '邮箱预设', component: 'input', rules: 'mail', gridItemProps: { span: 8 } },
  { field: 'phone', label: '手机号预设', component: 'input', rules: 'phone', gridItemProps: { span: 8 } },
  { field: 'landline', label: '座机预设', component: 'input', rules: 'landline', gridItemProps: { span: 8 } },
  { field: 'idCard', label: '身份证预设', component: 'input', rules: 'idCard', gridItemProps: { span: 8 } },
  { field: 'url', label: 'URL 预设', component: 'input', rules: 'url', gridItemProps: { span: 8 } },
  { field: 'password', label: '密码', component: 'input', componentProps: { type: 'password', showPasswordOn: 'click' }, gridItemProps: { span: 8 } },
  { field: 'confirmPassword', label: '确认密码', component: 'input', componentProps: { type: 'password', showPasswordOn: 'click' }, gridItemProps: { span: 8 } },
  { field: 'accept', label: '协议', component: 'checkbox', componentSlots: '我已阅读并同意协议', gridItemProps: { span: 8 } },
])
