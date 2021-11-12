import 'io-ts/Codec'
import { apply, F, match, pipe, T, tail, tryCatch } from 'ramda'

import { regexpCodec } from './regexpCodec'
import { validationCodec } from './validationCodec'

const format = /^\/(.+)\/(\w*)$/i
const regexpFromString = pipe(match(format), tail, apply(RegExp))
const isRegExp: (d: string) => boolean = tryCatch(pipe(regexpFromString, T), F)

export const regexpCodecAlt = validationCodec(
  regexpCodec(format),
  isRegExp,
  'form.validation.validRegExp'
)
