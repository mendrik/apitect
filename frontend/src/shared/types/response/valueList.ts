import { array, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZValue } from '../domain/values/value'
import { ZNodeSettings } from '../forms/nodetypes/nodeSettings'

export const ZValueList = object({
  values: array(ZValue)
})

export type ValueList = TypeOf<typeof ZValueList>
