import { array, object } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZTag } from '../domain/tag'

export const ZTagsSettings = object({
  tags: array(ZTag)
})

export type TagsSettings = TypeOf<typeof ZTagsSettings>
