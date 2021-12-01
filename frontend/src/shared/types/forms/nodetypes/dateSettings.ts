import { boolean, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZDateSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Date),
    validation: object({}),
    required: boolean().default(false),
    display: object({
      humanReadable: boolean()
    })
  })
)

export type DateSettings = TypeOf<typeof ZDateSettings>
