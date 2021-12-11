import { dateCodec } from '~shared/codecs/dateCodec'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'

const $getDateValidator = (settings?: DateSettings) => dateCodec

export const getDateValidator = (settings?: DateSettings) => {
  const base = $getDateValidator(settings)
  return settings?.required === true ? base : base.optional()
}
