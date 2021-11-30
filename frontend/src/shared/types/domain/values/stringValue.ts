import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZValueBase } from './valueBase'

export const ZStringValue = ZValueBase.merge(
  object({
    value: string()
  })
)

export type StringValue = TypeOf<typeof ZStringValue>
