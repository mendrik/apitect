import { number, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettingsBase } from './nodeSettingsBase'

export const ZArraySettings = ZNodeSettingsBase.merge(
  object({
    validation: object({ maxItems: number().optional() })
  })
)

export type ArraySettings = TypeOf<typeof ZArraySettings>
