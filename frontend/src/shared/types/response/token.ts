import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const ZToken = object({
  token: string()
})

export const JwtPayload = object({
  name: string().min(1),
  email: string().min(1),
  docId: string().min(1)
})

export type Token = TypeOf<typeof ZToken>
