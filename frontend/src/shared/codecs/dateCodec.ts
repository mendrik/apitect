import { parseISO } from 'date-fns'
import { date, string, union } from 'zod'

export const dateCodec = union([
  date(),
  string()
    .refine(str => !isNaN(Date.parse(str)))
    .transform(parseISO)
])
