import { always, invoker, isNil, pipe, unless } from 'ramda'
import { number, ZodNumber } from 'zod'
import { NumberSettings } from '~shared/types/forms/nodetypes/numberSettings'

const $getNumberValidator = (settings?: NumberSettings) => {
  const min = settings?.validation.min
  const max = settings?.validation.max
  return pipe(
    unless(always(isNil(min)), invoker(1, 'min')(min)),
    unless(always(isNil(max)), invoker(1, 'max')(max))
  )(number()) as ZodNumber
}

export const getNumberValidator = (settings?: NumberSettings) => {
  const base = $getNumberValidator(settings)
  return settings?.required === true ? base : base.optional()
}
