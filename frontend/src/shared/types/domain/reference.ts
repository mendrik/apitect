import { array, lazy, object, Schema, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

import { idCodec } from '../../codecs/idCodec'
import { Id } from './id'
import { ZNode } from './node'

export const ZReference = object({
  nodeId: idCodec,
  arrayItemId: string()
})

export type Reference = TypeOf<typeof ZReference>
