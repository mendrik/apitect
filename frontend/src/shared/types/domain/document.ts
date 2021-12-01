import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { nameCodecWithSpaces } from '../../codecs/nameCodec'
import { ZNode } from './node'

export const ZDocument = object({
  id: idCodec,
  name: nameCodecWithSpaces,
  owner: string(),
  tree: ZNode
})

export type Document = TypeOf<typeof ZDocument>
