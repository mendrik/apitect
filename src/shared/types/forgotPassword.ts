import * as t from 'io-ts'

import { emailCodec } from '../codecs/emailCodec'

export const TForgotPassword = t.type({
  email: emailCodec
})

export type ForgotPassword = t.TypeOf<typeof TForgotPassword>
