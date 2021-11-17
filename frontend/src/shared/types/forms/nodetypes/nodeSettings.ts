import { union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNumberSettings } from './numberSettings'
import { ZStringSettings } from './stringSettings'

export const ZNodeSettings = union([
  // ZArraySettings,
  /*
  ZBinarySettings,
  ZBooleanSettings,
  ZColorSettings,
  ZDateSettings,
  ZEnumSettings,
  ZLocationSettings,
*/
  ZNumberSettings,
  /*
  ZObjectSettings,
  ZReferenceSettings,
*/
  ZStringSettings
])

export type NodeSettings = TypeOf<typeof ZNodeSettings>
