import * as t from 'io-ts'

export const TDocument = t.type({
  id: t.number,
  name: t.string
})
