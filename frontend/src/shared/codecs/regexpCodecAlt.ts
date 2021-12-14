import { apply, F, match, pipe, T, tail, tryCatch } from 'ramda'
import { string } from 'zod'

const format = /^\/(.+)\/(\w*)$/i
export const regexpFromString = pipe<any, any, any, RegExp>(match(format), tail, apply(RegExp))
const isRegExp: (d: string) => boolean = tryCatch(pipe(regexpFromString, T), F)

export const regexpCodecAlt = string().regex(format).refine(isRegExp, 'form.validation.validRegExp')
