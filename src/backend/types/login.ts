import * as t from 'io-ts'
import v from 'validator'

import { nonEmptyString, validationCodec } from '../../utils/validationCodec'

export const TLogin = t.type({
  email: validationCodec(t.string, v.isEmail, 'form.validation.validEmail'),
  password: nonEmptyString
})

export type Login = t.TypeOf<typeof TLogin>
