import { literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { regexpCodecAlt } from '../../../codecs/regexpCodecAlt'
import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZStringSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.String),
    validation: object({
      regexp: regexpCodecAlt.optional()
    })
  })
)
export type StringSettings = TypeOf<typeof ZStringSettings>
