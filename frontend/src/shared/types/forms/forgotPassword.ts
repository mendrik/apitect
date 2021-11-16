import { object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { emailCodec } from '../../codecs/emailCodec'

export const TForgotPassword = object({
  email: emailCodec
})

export type ForgotPassword = TypeOf<typeof TForgotPassword>
