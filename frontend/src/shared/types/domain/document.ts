import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { ZNode } from './node'

export const ZDocument = object({
  id: idCodec,
  name: string(),
  owner: string(),
  tree: ZNode
})

export type Document = TypeOf<typeof ZDocument>
