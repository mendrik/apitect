import 'io-ts/Codec'
import v from 'validator'

import { nonEmptyString } from './nonEmptyString'
import { validationCodec } from './validationCodec'

export const emailCodec = validationCodec(nonEmptyString, v.isEmail, 'form.validation.validEmail')
