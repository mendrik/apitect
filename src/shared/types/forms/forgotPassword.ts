import { emailCodec } from '@codecs/emailCodec'
import * as t from 'io-ts'

export const TForgotPassword = t.type({
  email: emailCodec
})

export type ForgotPassword = t.TypeOf<typeof TForgotPassword>
