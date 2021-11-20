import { literal, object, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export enum StringValidationType {
  None = 'None',
  Regexp = 'Regexp',
  Email = 'Email'
}

const ZNone = ZNodeSettingsBase.merge(
  object({
    validationType: literal(StringValidationType.None).default(StringValidationType.None),
    nodeType: literal(NodeType.String)
  })
)

const ZRegexp = ZNodeSettingsBase.merge(
  object({
    validationType: literal(StringValidationType.Regexp),
    nodeType: literal(NodeType.String),
    regexp: regexpCodecAlt
  })
)

const ZEmail = ZNodeSettingsBase.merge(
  object({
    validationType: literal(StringValidationType.Email),
    nodeType: literal(NodeType.String)
  })
)

export const ZStringSettings = union([ZRegexp, ZEmail, ZNone])
export type StringSettings = TypeOf<typeof ZStringSettings>
