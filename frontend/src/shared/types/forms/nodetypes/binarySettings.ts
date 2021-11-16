import { intersection, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZBinarySettings = intersection(
  ZNodeSettingsBase,
  object({
    validation: object({}).optional()
  })
)

export type BinarySettings = TypeOf<typeof ZBinarySettings>
