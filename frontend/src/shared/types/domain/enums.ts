import { array, boolean, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { nameCodec } from '../../codecs/nameCodec'

export const ZEnumValue = object({
  value: nameCodec,
  isUse: boolean()
})

export const ZEnum = object({
  name: nameCodec,
  values: array(ZEnumValue)
})

export const ZEnums = array(ZEnum)

export type Enums = TypeOf<typeof ZEnums>
export type Enum = TypeOf<typeof ZEnum>
