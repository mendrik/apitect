import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { nonEmptyString } from '../../codecs/nonEmptyString'
import { passwordString } from '../../codecs/passwordString'

export const ZRegister = object({
  name: nonEmptyString,
  email: string().email(),
  password: passwordString,
  passwordRepeat: passwordString
})

export type Register = TypeOf<typeof ZRegister>
