import { object, Schema } from 'zod'

import { nameCodec } from '../../codecs/nameCodec'

export interface Tag {
  name: string
  parent?: string
}

export const ZTag: Schema<Tag> = object({
  name: nameCodec,
  parent: nameCodec.optional()
})
