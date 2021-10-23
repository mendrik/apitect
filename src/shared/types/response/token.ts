import { nullable } from '@codecs/nullable'
import * as t from 'io-ts'

export const TToken = t.type({
  token: nullable(t.string)
})

export type Token = t.TypeOf<typeof TToken>
