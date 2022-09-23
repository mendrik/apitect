import { string } from 'zod'

export const regexpCodec = (r: RegExp) =>
  string({ description: 'regexp' }).regex(r, 'form.validation.regexp')
