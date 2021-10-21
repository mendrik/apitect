import * as t from 'io-ts'
import { ObjectId } from 'mongodb'

import { decode } from '../../shared/codecs/decode'
import { enumCodec } from '../../shared/codecs/enumCodec'
import { Collections } from '../services/database'
import { idCodec } from './idCodec'

export const TRef = t.type({
  $ref: enumCodec('collectionName', Collections),
  $id: idCodec
})

export const ref = (name: string) => (id: ObjectId) => decode(TRef)({ $ref: name, $id: id })

export const userRef = ref('users')
export const documentRef = ref('documents')
