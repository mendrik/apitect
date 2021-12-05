import { object, Schema } from 'zod'

import { nameCodec } from '../../codecs/nameCodec'

export type TagName = string

export interface Tag {
  name: TagName
  parent?: string
}

export const ZTag: Schema<Tag> = object({
  name: nameCodec,
  parent: nameCodec.optional()
})
