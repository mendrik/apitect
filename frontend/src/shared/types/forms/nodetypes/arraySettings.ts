import { literal, number, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZReference } from '../../domain/reference'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZArraySettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Array),
    validation: object({ maxItems: number().optional() }),
    idFields: ZReference
  })
)

export type ArraySettings = TypeOf<typeof ZArraySettings>
