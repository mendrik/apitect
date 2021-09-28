import * as t from 'io-ts'

export const TToken = t.type({
  token: t.string
})

export type Token = t.TypeOf<typeof TToken>
