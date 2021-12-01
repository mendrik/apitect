import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZReferenceSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Reference),
    required: boolean().default(false),
    validation: object({})
  })
)

export type ReferenceSettings = TypeOf<typeof ZReferenceSettings>
