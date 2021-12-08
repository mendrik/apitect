import { date, literal, object } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { NodeType } from '~shared/types/domain/nodeType'
import { DateSettings } from '~shared/types/forms/nodetypes/dateSettings'

import { ZValueBase } from './valueBase'

export const ZDateValue = ZValueBase.merge(
  object({
    nodeType: literal(NodeType.Date),
    value: date()
  })
)

export type DateValue = TypeOf<typeof ZDateValue>

const $getDateValidator = (settings?: DateSettings) => {
  return date()
}

export const getStringValidator = (settings?: DateSettings) => {
  const base = $getDateValidator(settings)
  return settings?.required === true ? base : base.optional()
}
