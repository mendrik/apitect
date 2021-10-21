import { ObjectId } from 'mongodb'
import { pipe, prop } from 'ramda'

export const extractId = pipe<Record<'_id', ObjectId>, ObjectId, string>(prop('_id'), id =>
  id.toHexString()
)
