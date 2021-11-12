import * as t from 'io-ts'
import { test } from 'ramda'

import { validationCodec } from './validationCodec'

export const regexpCodec = (r: RegExp) =>
  validationCodec(t.string, test(r), 'form.validation.regexp')
