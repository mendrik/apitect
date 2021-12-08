import { boolean, literal, nativeEnum, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { dateFormatCodec } from '~shared/codecs/dateFormatCodec'

import { NodeType } from '../../domain/nodeType'
import { ZNodeSettingsBase } from './nodeSettingsBase'

export enum DateDisplay {
  Localized = 'localized',
  Custom = 'custom',
  HumanReadable = 'humanReadable'
}

export const ZDateSettings = ZNodeSettingsBase.merge(
  object({
    nodeType: literal(NodeType.Date),
    required: boolean().default(false),
    display: nativeEnum(DateDisplay).default(DateDisplay.Localized),
    format: dateFormatCodec.default('dd/MM/yyyy')
  })
)

export type DateSettings = TypeOf<typeof ZDateSettings>
