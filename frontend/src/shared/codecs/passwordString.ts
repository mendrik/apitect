import { string } from 'zod'
import { nonEmptyString } from '~shared/codecs/nonEmptyString'

/**
 ^                  Start anchor
 (?=.*[A-Z])        Ensure string has two uppercase letters.
 (?=.*[0-9])        Ensure string has two digits.
 .{6,}               Ensure string is of length 6.
 $                  End anchor.
 */
export const passwordString = nonEmptyString.regex(
  /^(?=.*[A-Z])(?=.*[0-9]).{6,}$/,
  'form.validation.password'
)
