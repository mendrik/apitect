import { array, boolean, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { nameCodec } from '../../codecs/nameCodec'

export const ZEnumValue = object({
  name: nameCodec,
  isUse: boolean()
})

export const ZEnums = object({
  name: nameCodec,
  values: array(ZEnumValue)
})

export type Enums = TypeOf<typeof ZEnums>
