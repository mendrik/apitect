import { apply, F, match, pipe, T, tail, tryCatch } from 'ramda'
import { string } from 'zod'

const format = /^\/(.+)\/(\w*)$/i
const regexpFromString = pipe(match(format), tail, apply(RegExp))
const isRegExp: (d: string) => boolean = tryCatch(pipe(regexpFromString, T), F)

export const regexpCodecAlt = string({}).refine(isRegExp, 'form.validation.validRegExp')
