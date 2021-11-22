import { number, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZValueBase } from '../value'

export const ZNumberValue = ZValueBase.merge(
  object({
    value: number()
  })
)

export type NumberValue = TypeOf<typeof ZNumberValue>
