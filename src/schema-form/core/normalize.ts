import type { FormItemRule } from 'naive-ui'
import type { GridItemProps } from '@/grid/types'
import type {
  NormalizedSchema,
  NormalizeSchemaContext,
  NormalizeSchemaListContext,
  SchemaComponentAdapter,
} from '@/schema-form/core/types'
import type {
  CallbackParams,
  CallbackParamsFunction,
  OptionType,
  Schema,
  SchemaFormCommonProps,
  UnwrapSchema,
} from '@/schema-form/types/common.ts'
import type { SchemaComponentName } from '@/schema-form/types/component'
import type { Recordable } from '@/types/shared'
import { isFunction, isString, omit } from 'es-toolkit'
import { get, isArray, isNumber } from 'es-toolkit/compat'
import { resolveSchemaComponentProps } from '@/config/resolve'
import { getSchemaComponentAdapter } from '@/schema-form/core/registry'
import { generatePlaceholder, generateRule, handleRulePresets } from '@/schema-form/core/rules'

const FORM_ITEM_OMIT_KEYS: (keyof Schema)[] = [
  'field',
  'component',
  'label',
  'componentProps',
  'componentSlots',
  'hide',
  'rules',
  'tooltip',
  'modelProp',
  'placeholder',
  'startPlaceholder',
  'endPlaceholder',
  'options',
  'disabled',
  'gridItemProps',
  'formItemProps',
  'formItemSlot',
  'slot',
]

function callbackParamsFunction<TForm extends Recordable, R>(value: R | CallbackParamsFunction<TForm, R>, params: CallbackParams<TForm>): R {
  return isFunction(value)
    ? value(params)
    : value
}

function normalizeGridItemProps(item?: number | GridItemProps): GridItemProps {
  return (isNumber(item) ? { span: item } : item || {}) as GridItemProps
}

function resolveRules(schema: UnwrapSchema, props: SchemaFormCommonProps): FormItemRule | FormItemRule[] | undefined {
  const rules = schema.rules
  if (!rules) {
    const isRequire = Boolean(schema.showRequireMark ?? props.showRequireMark)
    const shouldGenerateRequiredRule = Boolean(props.autoRequiredRule && isRequire && schema.component && isString(schema.label))
    return shouldGenerateRequiredRule ? generateRule(schema.label as string, schema.component!) : undefined
  }

  if (typeof rules === 'string')
    return handleRulePresets(rules)

  return rules
}

function resolveComponentProps(
  schema: UnwrapSchema,
  adapter: SchemaComponentAdapter | undefined,
  ctx: NormalizeSchemaContext,
  params: CallbackParams,
) {
  const { component, componentProps, placeholder, startPlaceholder, endPlaceholder, options, disabled } = schema
  const mapProps: Recordable = {}
  /**
   * 先合并全局组件默认值，使得 Schema 级别的属性可以覆盖它们。
   */
  const props = resolveSchemaComponentProps(
    component as SchemaComponentName | string | undefined,
    componentProps as Recordable | undefined,
    ctx.schemaFormComponentProps,
  )

  if (!component || !adapter)
    return props

  if (adapter.valueType === 'date') {
    mapProps.format = ctx.schemaFormProps.defaultDateFormat
    mapProps.valueFormat = ctx.schemaFormProps.defaultDateValueFormat
  }

  if (adapter.valueType === 'time') {
    mapProps.format = ctx.schemaFormProps.defaultTimeFormat
    mapProps.valueFormat = ctx.schemaFormProps.defaultTimeValueFormat
  }

  if (ctx.schemaFormProps.autoPlaceholder && adapter.mapPlaceholder && isString(schema.label)) {
    const autoPlaceholder = generatePlaceholder(schema.label, component, props.type)
    if (isArray(autoPlaceholder)) {
      mapProps.startPlaceholder = autoPlaceholder[0]
      mapProps.endPlaceholder = autoPlaceholder[1]
    }
    else if (autoPlaceholder) {
      mapProps.placeholder = autoPlaceholder
    }
  }

  if (placeholder && adapter.mapPlaceholder)
    mapProps.placeholder = placeholder

  if ((startPlaceholder || endPlaceholder) && adapter.valueType === 'date' && props.type?.includes?.('range')) {
    if (startPlaceholder)
      mapProps.startPlaceholder = startPlaceholder
    if (endPlaceholder)
      mapProps.endPlaceholder = endPlaceholder
  }

  if (options && adapter.mapOptions)
    mapProps.options = options as OptionType[]

  if (disabled !== undefined || ctx.disabled !== undefined)
    mapProps.disabled = callbackParamsFunction(disabled, params) ?? ctx.disabled

  return {
    ...mapProps,
    ...props,
  }
}

function resolveSchemaError(schema: UnwrapSchema, adapter: SchemaComponentAdapter | undefined, componentProps: Recordable) {
  if (!schema.component)
    return undefined

  if (!adapter)
    return `SchemaForm: unknown component "${String(schema.component)}".`

  if (adapter.valueType === 'date' && componentProps.type && adapter.dateTypes && !adapter.dateTypes.includes(componentProps.type))
    return `SchemaForm: datePicker.type only supports ${adapter.dateTypes.join(', ')}.`
}

function normalizeSchemaItemInternal(schema: UnwrapSchema, ctx: NormalizeSchemaContext): NormalizedSchema {
  const field = schema.field as string | undefined
  const params = {
    model: ctx.model,
    value: field ? get(ctx.model, field) : undefined,
    field,
  } as CallbackParams

  const componentName = schema.component as SchemaComponentName | string | undefined
  const adapter = getSchemaComponentAdapter(componentName)
  const componentProps = resolveComponentProps(
    schema as UnwrapSchema,
    adapter,
    ctx as NormalizeSchemaContext,
    params as CallbackParams,
  )
  const error = resolveSchemaError(schema, adapter, componentProps)
  const label = schema.label
    ? callbackParamsFunction<Recordable, NormalizedSchema['label']>(schema.label as any, params)
    : undefined

  return {
    raw: schema,
    model: ctx.model,
    key: field || schema.slot || schema.formItemSlot || `${ctx.formId}-${ctx.index}`,
    field,
    label,
    visible: !(callbackParamsFunction(schema.hide, params) ?? false),
    componentName,
    component: adapter?.component,
    adapter,
    componentProps,
    formItemProps: {
      ...omit(schema, FORM_ITEM_OMIT_KEYS),
      ...((schema.formItemProps as Recordable | undefined) || {}),
    },
    gridItemProps: normalizeGridItemProps(schema.gridItemProps ?? ctx.fallbackGridItemProps ?? ctx.schemaFormProps.gridItemProps),
    rules: resolveRules(schema, ctx.schemaFormProps),
    itemSlot: schema.slot as string | undefined,
    formItemSlot: schema.formItemSlot as string | undefined,
    error,
  }
}

export function normalizeSchemaItem<TForm extends Recordable>(schema: UnwrapSchema<TForm>, ctx: NormalizeSchemaContext<TForm>): NormalizedSchema<TForm> {
  return normalizeSchemaItemInternal(
    schema as UnwrapSchema,
    ctx as NormalizeSchemaContext,
  ) as NormalizedSchema<TForm>
}

export function normalizeSchema<TForm extends Recordable>(schema: UnwrapSchema<TForm>[], ctx: NormalizeSchemaListContext<TForm>) {
  const result: NormalizedSchema<TForm>[] = []

  for (let index = 0; index < schema.length; index += 1) {
    const item = normalizeSchemaItemInternal(
      schema[index] as UnwrapSchema,
      { ...ctx, index } as NormalizeSchemaContext,
    ) as NormalizedSchema<TForm>
    result.push(item)
  }

  return result
}
