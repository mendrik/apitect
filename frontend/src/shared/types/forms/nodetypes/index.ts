import * as t from 'io-ts'

import { TArraySettings } from './arraySettings'
import { TBinarySettings } from './binarySettings'
import { TBooleanSettings } from './booleanSettings'
import { TColorSettings } from './colorSettings'
import { TDateSettings } from './dateSettings'
import { TEnumSettings } from './enumSettings'
import { TLocationSettings } from './locationSettings'
import { TNumberSettings } from './numberSettings'
import { TObjectSettings } from './objectSettings'
import { TReferenceSettings } from './referenceSettings'
import { TStringSettings } from './stringSettings'

export const TNodeSettings = t.union([
  TArraySettings,
  TBinarySettings,
  TBooleanSettings,
  TColorSettings,
  TDateSettings,
  TEnumSettings,
  TLocationSettings,
  TNumberSettings,
  TObjectSettings,
  TReferenceSettings,
  TStringSettings
])
