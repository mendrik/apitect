import { string, ZodString } from 'zod'
import { passwordString } from '~shared/codecs/passwordString'
import { regexpCodec } from '~shared/codecs/regexpCodec'
import { regexpFromString } from '~shared/codecs/regexpCodecAlt'
import { StringSettings, StringValidationType } from '~shared/types/forms/nodetypes/stringSettings'

const $getStringValidator = (settings?: StringSettings): ZodString => {
  switch (settings?.validationType) {
    case StringValidationType.Regexp:
      return regexpCodec(regexpFromString(settings.regexp))
    case StringValidationType.Email:
      return string().email()
    case StringValidationType.Password:
      return passwordString
    default:
      return string().min(1)
  }
}

export const getStringValidator = (settings?: StringSettings) => {
  const base = $getStringValidator(settings)
  return settings?.required === true ? base : base.optional()
}
