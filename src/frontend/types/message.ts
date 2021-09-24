import * as t from 'io-ts'

const THello = t.type({
  type: t.literal('HELLO'),
  message: t.string
})

const TBye = t.type({
  type: t.literal('BYE'),
  test: t.boolean
})

export const TMessage = t.union([THello, TBye])

export type Message = t.TypeOf<typeof TMessage>
