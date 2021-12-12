import { nameCodec } from '~shared/codecs/nameCodec'
import { Enum } from '~shared/types/domain/enums'
import { EnumSettings } from '~shared/types/forms/nodetypes/enumSettings'
import { field } from '~shared/utils/ramda'

const $getEnumValidator = (e: Enum) =>
  nameCodec.refine(str => e.values.map(field('value')).includes(str))

export const getEnumValidator = (e: Enum, settings?: EnumSettings) => {
  const base = $getEnumValidator(e)
  return settings?.required === true ? base : base.optional()
}
