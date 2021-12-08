import { date } from 'zod'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'

const $getDateValidator = (settings?: DateSettings) => {
  return date()
}

export const getDateValidator = (settings?: DateSettings) => {
  const base = $getDateValidator(settings)
  return settings?.required === true ? base : base.optional()
}
