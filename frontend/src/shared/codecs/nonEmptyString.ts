import { string } from 'zod'

export const nonEmptyString = string().min(1, 'form.validation.required')
