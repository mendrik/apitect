import * as t from 'io-ts'
import { NonEmptyString } from 'io-ts-types'
import { enumCodec } from '../codecs/enumCodec'
import { sherlockDate } from '../codecs/sherlockCodec'

export enum BooleanEditor {
  Switch = 'SWITCH',
  Checkbox = 'CHECKBOX'
}

export enum IntegerEditor {
  Range = 'RANGE',
  Input = 'INPUT'
}

export enum TextEditor {
  Simple = 'SIMPLE',
  Text = 'TEXT',
  Markdown = ' Markdown'
}

export enum FieldType {
  Text = 'TEXT',
  Boolean = 'BOOLEAN',
  Integer = 'INTEGER',
  Decimal = 'DECIMAL',
  Enumeration = 'ENUMERATION',
  List = 'LIST',
  Object = 'OBJECT',
  Date = 'DATE',
  ExternalList = 'EXTERNAL_LIST',
  ExternalObject = 'EXTERNAL_OBJECT'
}

enum ExternalListType {
  Database = 'DATABASE',
  RestAPI = 'REST_API'
}

const TExternalList = t.type({})
const TExternalObject = t.type({})

const UiProps: Record<FieldType, t.Mixed> = {
  BOOLEAN: t.type({
    editor: enumCodec('booleanEditor', BooleanEditor)
  }),
  DECIMAL: t.type({}),
  ENUMERATION: t.type({
    multiple: t.boolean
  }),
  DATE: t.type({
    withTime: t.boolean,
    minDate: sherlockDate,
    maxDate: sherlockDate
  }),
  EXTERNAL_LIST: TExternalList,
  EXTERNAL_OBJECT: TExternalObject,
  INTEGER: t.type({
    editor: enumCodec('integerEditor', IntegerEditor)
  }),
  LIST: t.type({
    schema: t.string
  }),
  OBJECT: t.type({
    schema: t.string
  }),
  TEXT: t.type({
    editor: enumCodec('textEditor', TextEditor)
  })
}

const TUiProps = t.type({})

const TField = t.type({
  name: NonEmptyString,
  label: NonEmptyString,
  required: t.boolean,
  type: enumCodec('type', FieldType)
  // todo add UIProps here somehow
})

const TGroup = t.type({
  fields: t.array(TField)
})

const TSchema = t.record(t.string, t.union([TField, TGroup]))
