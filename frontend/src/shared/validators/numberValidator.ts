import { number } from 'zod'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'

const $getNumberValidator = (settings?: NumberSettings) => number()

export const getNumberValidator = (settings?: NumberSettings) => {
  const base = $getNumberValidator(settings)
  return settings?.required === true ? base : base.optional()
}
