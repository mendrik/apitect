import { apply, F, match, pipe, T, tail, tryCatch } from 'ramda'
import { string } from 'zod'

const format = /^\/(.+)\/(\w*)$/i
export const regexpFromString = pipe(match(format), tail as any, apply(RegExp))
const isRegExp: (d: string) => boolean = tryCatch(pipe(regexpFromString, T), F)

export const regexpCodecAlt = string().regex(format).refine(isRegExp, 'form.validation.validRegExp')
