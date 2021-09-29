import * as t from 'io-ts'

import { nullable } from '../../utils/codecs/nullable'

export const TToken = t.type({
  token: nullable(t.string)
})

export type Token = t.TypeOf<typeof TToken>
