import { literal, number, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../../codecs/idCodec'
import { nonEmptyString } from '../../../codecs/nonEmptyString'
import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZArraySettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Array),
    validation: object({ maxItems: number().optional() })
  })
)

export type ArraySettings = TypeOf<typeof ZArraySettings>
