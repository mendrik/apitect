import * as t from 'io-ts'

export const TUser = t.type({
  name: t.string,
  email: t.string,
  token: t.string
})
