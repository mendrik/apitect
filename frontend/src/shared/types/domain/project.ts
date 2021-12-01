import { array, object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { ZNodeSettings } from '../forms/nodetypes/nodeSettings'
import { ZDocument } from './document'
import { ZTag } from './tag'

export const ZProject = object({
  document: ZDocument,
  tags: array(ZTag),
  visibleTags: array(string()),
  nodeSettings: array(ZNodeSettings)
})

export type Project = TypeOf<typeof ZProject>
