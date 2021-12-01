import { boolean, literal, nativeEnum, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

enum ColorFormat {
  Hex,
  RGB,
  HTML
}

export const ZColorSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Color),
    validation: object({}),
    required: boolean().default(false),
    display: object({
      format: nativeEnum(ColorFormat)
    })
  })
)

export type ColorSettings = TypeOf<typeof ZColorSettings>
