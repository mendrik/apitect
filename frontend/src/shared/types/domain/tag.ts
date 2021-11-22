import { array, lazy, object, Schema, string } from 'zod'

import { idCodec } from '../../codecs/idCodec'
import { Id } from './id'
import { Reference, ZReference } from './reference'

export interface Tag {
  id: Id
  name: string
  owners: Reference[]
  parent?: Tag
}

export const ZTag: Schema<Tag> = object({
  id: idCodec,
  name: string(),
  owners: array(ZReference),
  parent: lazy(() => ZTag.optional())
})
