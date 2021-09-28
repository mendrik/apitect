import * as t from 'io-ts'

export const TUser = t.type({
  id: t.number,
  name: t.string,
  email: t.string,
  role: t.string
})

export type User = t.TypeOf<typeof TUser>
