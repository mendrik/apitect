import { literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZLocationSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Location),
    validation: object({})
  })
)

export type LocationSettings = TypeOf<typeof ZLocationSettings>
