import { literal, object, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export enum StringValidationType {
  None = 'None',
  Regexp = 'Regexp',
  Email = 'Email',
  Password = 'Password'
}

const ZNone = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.String),
    validationType: literal(StringValidationType.None).default(StringValidationType.None)
  })
)

const ZRegexp = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.String),
    validationType: literal(StringValidationType.Regexp),
    regexp: regexpCodecAlt
  })
)

const ZEmail = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.String),
    validationType: literal(StringValidationType.Email)
  })
)

const ZPassword = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.String),
    validationType: literal(StringValidationType.Password)
  })
)

export const ZStringSettings = union([ZRegexp, ZEmail, ZPassword, ZNone])
export type StringSettings = TypeOf<typeof ZStringSettings>
