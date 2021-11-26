import { literal, number, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZReference } from '../../domain/reference'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZArraySettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Array),
    validation: object({ maxItems: number().optional() }),
    display: string().optional(),
    idField: ZReference
  })
)

export type ArraySettings = TypeOf<typeof ZArraySettings>
