import { union } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZArraySettings } from './arraySettings'
import { ZBinarySettings } from './binarySettings'
import { ZBooleanSettings } from './booleanSettings'
import { ZColorSettings } from './colorSettings'
import { ZDateSettings } from './dateSettings'
import { ZEnumSettings } from './enumSettings'
import { ZLocationSettings } from './locationSettings'
import { ZNumberSettings } from './numberSettings'
import { ZObjectSettings } from './objectSettings'
import { ZReferenceSettings } from './referenceSettings'
import { ZRichTextSettings } from './richTextSettings'
import { ZStringSettings } from './stringSettings'

export const ZNodeSettings = union([
  ZNumberSettings,
  ZStringSettings,
  ZArraySettings,
  ZObjectSettings,
  ZReferenceSettings,
  ZBinarySettings,
  ZBooleanSettings,
  ZColorSettings,
  ZDateSettings,
  ZEnumSettings,
  ZLocationSettings,
  ZRichTextSettings
])

export type NodeSettings = TypeOf<typeof ZNodeSettings>
