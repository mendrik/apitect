import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZToken = object({
  token: string().nullish()
})

export const JwtPayload = object({
  name: string().nonempty(),
  email: string().nonempty()
})

export type Token = TypeOf<typeof ZToken>
