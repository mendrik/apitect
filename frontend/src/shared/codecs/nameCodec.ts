import { string } from 'zod'

export const nameCodec = string()
  .nonempty('form.validation.required')
  .regex(/^[a-zA-Z0-1-$]+$/i, 'form.validation.noSpecialCharactersOrSpace')

export const nameCodecWithSpaces = string()
  .nonempty('form.validation.required')
  .regex(/^[a-zA-Z0-1-$ ]+$/i, 'form.validation.noSpecialCharacters')
