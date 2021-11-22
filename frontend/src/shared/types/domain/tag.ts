import { lazy, object, Schema, string } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { Id } from './id'

export interface Tag {
  id: Id
  name: string
  parent?: Tag
}

export const ZTag: Schema<Tag> = object({
  id: idCodec,
  name: string(),
  parent: lazy(() => ZTag.optional())
})
