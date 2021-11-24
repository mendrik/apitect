import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { nonEmptyString } from '../../codecs/nonEmptyString'

export const ZLogin = object({
  email: string().email(),
  password: nonEmptyString
})

export type Login = TypeOf<typeof ZLogin>
