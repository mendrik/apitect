import { literal, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { passwordString } from '~shared/codecs/passwordString'
import { regexpCodec } from '~shared/codecs/regexpCodec'
import { regexpFromString } from '~shared/codecs/regexpCodecAlt'
import { NodeType } from '~shared/types/domain/nodeType'
import { StringSettings, StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'

import { ZValueBase } from './valueBase'

export const ZStringValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.String),
    value: string()
  })
)

export type StringValue = TypeOf<typeof ZStringValue>

export const getStringValidator = (settings?: StringSettings) => {
  switch (settings?.validationType) {
    case StringValidationType.Regexp:
      return regexpCodec(regexpFromString(settings.regexp))
    case StringValidationType.Email:
      return string().email()
    case StringValidationType.Password:
      return passwordString
    default:
      return string().nonempty()
  }
}
