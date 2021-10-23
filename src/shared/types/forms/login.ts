import { emailCodec } from '@codecs/emailCodec'
import { nonEmptyString } from '@codecs/nonEmptyString'
import * as t from 'io-ts'

export const TLogin = t.type({
  email: emailCodec,
  password: nonEmptyString
})

export type Login = t.TypeOf<typeof TLogin>
