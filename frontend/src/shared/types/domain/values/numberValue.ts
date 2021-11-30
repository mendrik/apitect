import { number, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZValueBase } from './valueBase'

export const ZNumberValue = ZValueBase.merge(
  object({
    value: number()
  })
)

export type NumberValue = TypeOf<typeof ZNumberValue>
