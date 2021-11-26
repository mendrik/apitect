import { lazy, object, Schema, string } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { Id } from './id'

export interface Tag {
  name: string
  parent?: string
}

export const ZTag: Schema<Tag> = object({
  name: string(),
  parent: string().optional()
})
