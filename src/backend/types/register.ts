import * as t from 'io-ts'

export const TRegister = t.type({
  name: t.string,
  email: t.string,
  password: t.string
})
