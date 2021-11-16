import { string } from 'zod'

export const regexpCodec = (r: RegExp) => string().regex(r, 'form.validation.regexp')
