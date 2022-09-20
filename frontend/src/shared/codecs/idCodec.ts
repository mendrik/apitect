import { v4 as uuid } from 'uuid'
import { ZodType } from 'zod'

import { Id } from '../types/domain/id'
import { nonEmptyString } from './nonEmptyString'

export const newId = (): Id => uuid() as Id

export const idCodec: ZodType<Id> = nonEmptyString

export const nodeId = idCodec
export const arrayNodeId = idCodec
