import { v4 as uuid } from 'uuid'
import { string, ZodType } from 'zod'

import { Id } from '../types/domain/id'

export const newId = (): Id => uuid() as Id

export const idCodec: ZodType<Id> = string()
