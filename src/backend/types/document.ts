import * as t from 'io-ts'
import { TRef } from '../utils/reference'

export const TDocument = t.type({
  name: t.string,
  owner: TRef
})

export type Document = t.TypeOf<typeof TDocument>
