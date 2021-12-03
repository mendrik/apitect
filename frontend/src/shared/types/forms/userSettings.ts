import { array, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { nameCodec } from '../../codecs/nameCodec'

export const ZUserSettings = object({
  visibleTags: array(nameCodec)
})

export type UserSettings = TypeOf<typeof ZUserSettings>
