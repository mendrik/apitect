import * as t from 'io-ts'
import { complement, isEmpty } from 'ramda'

import { validationCodec } from './validationCodec'

export const nonEmptyString = validationCodec(
  t.string,
  complement(isEmpty),
  'form.validation.required'
)
