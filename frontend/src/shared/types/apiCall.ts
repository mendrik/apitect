import * as t from 'io-ts'
import { last, map, values } from 'ramda'

import { ApiSchema } from '../api'
import { idCodec } from '../codecs/idCodec'

const codecs = map(last, values(ApiSchema)) as [t.Mixed, t.Mixed, ...t.Mixed[]]

export const TApiCallRequest = t.type({
  id: idCodec,
  method: t.keyof(ApiSchema),
  input: t.union(codecs)
})

export type ApiCallRequest = t.TypeOf<typeof TApiCallRequest>
