import v from 'validator'
import { string } from 'zod'

const isPassword = (text: string): boolean =>
  v.isStrongPassword(text, {
    minLength: 4,
    minLowercase: 0,
    minSymbols: 0,
    minNumbers: 1,
    minUppercase: 0
  })

export const passwordString = string().refine(isPassword, 'form.validation.password')
