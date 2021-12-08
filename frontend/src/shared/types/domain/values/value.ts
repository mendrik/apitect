import { union } from 'zod'
import { TypeOf } from 'zod/lib/types'
import { ZBooleanValue } from '~shared/types/domain/values/booleanValue'
import { ZDateValue } from '~shared/types/domain/values/dateValue'

import { ZNumberValue } from './numberValue'
import { ZStringValue } from './stringValue'

export const ZValue = union([ZStringValue, ZNumberValue, ZBooleanValue, ZDateValue])

export type Value = TypeOf<typeof ZValue>
