import v from 'validator'

import { nonEmptyString } from './nonEmptyString'

export const emailCodec = nonEmptyString.refine(v.isEmail, 'form.validation.validEmail')
