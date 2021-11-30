import { union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNumberValue } from './numberValue'
import { ZStringValue } from './stringValue'

export const ZValue = union([ZStringValue, ZNumberValue])

export type Value = TypeOf<typeof ZValue>
