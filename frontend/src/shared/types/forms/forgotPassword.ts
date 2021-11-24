import { object, string } from 'zod'
import { TypeOf } from 'zod/lib/types'

export const TForgotPassword = object({
  email: string().email()
})

export type ForgotPassword = TypeOf<typeof TForgotPassword>
