import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZValueListRequest = object({
  tag: string(),
  nodeIds: array(string())
})

export type ValueListRequest = TypeOf<typeof ZValueListRequest>
