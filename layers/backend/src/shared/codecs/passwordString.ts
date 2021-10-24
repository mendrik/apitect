import * as t from 'io-ts'
import v from 'validator'

import { validationCodec } from './validationCodec'

const isPassword = (text: string): boolean =>
  v.isStrongPassword(text, {
    minLength: 4,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 1,
    minUppercase: 0
  })

export const passwordString = validationCodec(t.string, isPassword, 'form.validation.password')
