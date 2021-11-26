import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZDocument } from './document'
import { ZTag } from './tag'

export const ZProject = object({
  document: ZDocument,
  tags: array(ZTag),
  visibleTags: array(string())
})

export type Project = TypeOf<typeof ZProject>
