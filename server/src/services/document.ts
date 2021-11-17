import { isNil } from 'ramda'
import { idCodec } from '~shared/codecs/idCodec'
import { Document } from '~shared/types/domain/document'
import { Id } from '~shared/types/domain/id'
import { failOn } from '~shared/utils/failOn'
import { field } from '~shared/utils/ramda'

import { collection, Collections } from './database'
import { getUser } from './user'

export const getLastDocumentId = (email: string): Promise<Id> =>
  getUser(email)
    .then(field('lastDocument'))
    .then(id => idCodec.parse(id))

export const getLastDocument = (email: string): Promise<Document> =>
  getLastDocumentId(email)
    .then(id => collection(Collections.documents).findOne({ id }, { projection: { _id: 0 } }))
    .then(failOn<Document>(isNil, 'document not found'))
