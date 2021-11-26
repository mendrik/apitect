import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZUserSettings = object({
  visibleTags: array(string())
})

export type UserSettings = TypeOf<typeof ZUserSettings>
