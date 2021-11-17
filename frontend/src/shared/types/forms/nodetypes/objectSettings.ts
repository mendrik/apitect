import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZObjectSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Object),
    apiEndpoint: boolean()
  })
)

export type ObjectSettings = TypeOf<typeof ZObjectSettings>
