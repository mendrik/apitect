import { union } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ZArrayValue } from '~shared/types/domain/values/arrayValue'
import { ZBooleanValue } from '~shared/types/domain/values/booleanValue'
import { ZDateValue } from '~shared/types/domain/values/dateValue'
import { ZEnumValue } from '~shared/types/domain/values/enums'

import { ZNumberValue } from './numberValue'
import { ZStringValue } from './stringValue'

export const ZValue = union([
  ZStringValue,
  ZNumberValue,
  ZBooleanValue,
  ZDateValue,
  ZEnumValue,
  ZArrayValue
])

export type Value = TypeOf<typeof ZValue>
