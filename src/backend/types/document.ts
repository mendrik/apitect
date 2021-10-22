import * as t from 'io-ts'

import { idCodec } from '../utils/idCodec'

export const TDocument = t.type({
  name: t.string,
  owner: idCodec
})

export type Document = t.TypeOf<typeof TDocument>
