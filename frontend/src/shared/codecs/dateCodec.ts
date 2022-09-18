import { parseISO } from 'date-fns'
import { nAry } from 'ramda'
import { date, string, union } from 'zod'

export const dateCodec = union([
  date(),
  string()
    .refine(str => !isNaN(Date.parse(str)))
    .transform(nAry(1, parseISO))
])
