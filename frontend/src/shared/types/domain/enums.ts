import { prop } from 'ramda'
import { array, boolean, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { uniqueArray } from '~shared/codecs/uniqueArray'

import { nameCodec } from '../../codecs/nameCodec'

export const ZEnumValue = object({
  value: nameCodec,
  inUse: boolean()
})

export const ZEnum = object({
  name: nameCodec,
  values: array(ZEnumValue)
    .nonempty('form.validation.notEmpty')
    .superRefine(uniqueArray(prop('value')))
})

export const ZEnums = array(ZEnum)

export type Enums = TypeOf<typeof ZEnums>
export type Enum = TypeOf<typeof ZEnum>
export type EnumValue = TypeOf<typeof ZEnumValue>
