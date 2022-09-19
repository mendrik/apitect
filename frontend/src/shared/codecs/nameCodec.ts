import { string } from 'zod'
import { nonEmptyString } from '~shared/codecs/nonEmptyString'

export const nameCodec = string()
  .min(1, 'form.validation.required')
  .regex(/^[a-zA-Z0-9-_$]+$/i, 'form.validation.noSpecialCharactersOrSpace')

export const nameCodecWithSpaces = nonEmptyString.regex(
  /^[a-zA-Z0-9-$ ]+$/i,
  'form.validation.noSpecialCharacters'
)
