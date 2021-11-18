import { boolean, literal, object, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZObjectSettings = union([
  ZNodeSettingsBase.merge(
    object({
      nodeType: literal(NodeType.Object),
      apiEndpoint: literal(true),
      individual: boolean()
    })
  ),
  ZNodeSettingsBase.merge(
    object({
      nodeType: literal(NodeType.Object),
      apiEndpoint: literal(false)
    })
  )
])

export type ObjectSettings = TypeOf<typeof ZObjectSettings>
