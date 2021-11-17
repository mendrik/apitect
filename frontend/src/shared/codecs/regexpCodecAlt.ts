import { string } from 'zod'

const format = /^\/(.+)\/(\w*)$/i
export const regexpCodecAlt = string().regex(format, 'form.validation.validRegExp')
