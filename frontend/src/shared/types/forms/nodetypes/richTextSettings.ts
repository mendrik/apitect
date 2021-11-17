import { literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZRichTextSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.RichText),
    validation: object({})
  })
)

export type RichTextSettings = TypeOf<typeof ZRichTextSettings>
