import * as t from 'io-ts'

import { idCodec } from '../codecs/idCodec'

export const TNodeDeletedResponse = t.type({
  position: t.number,
  parentNode: idCodec
})
