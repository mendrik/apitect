import { string } from 'zod'

export const nonEmptyString = string().nonempty('form.validation.required')
