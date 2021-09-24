import * as t from 'io-ts'

export const TLogin = t.type({
  email: t.string,
  password: t.string
})

export type Login = t.TypeOf<typeof TLogin>
