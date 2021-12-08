import { format, parse } from 'date-fns'
import { F, tryCatch } from 'ramda'
import { nonEmptyString } from '~shared/codecs/nonEmptyString'

export const dateFormatCodec = nonEmptyString.refine(
  fmt => tryCatch(() => !!parse(format(new Date(), fmt), fmt, new Date()), F),
  'form.validation.dateformat'
)
