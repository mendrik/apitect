import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ZValue } from '~shared/types/domain/values/value'

export const ZItem = object({
  id: string(),
  values: array(ZValue)
})

export type Item = TypeOf<typeof ZItem>
