import { isNil } from 'ramda'
import { decode } from '~shared/codecs/decode'
import { idCodec } from '~shared/codecs/idCodec'
import { Document } from '~shared/types/domain/document'
import { Id } from '~shared/types/domain/id'
import { failOn } from '~shared/utils/failOn'
import { field } from '~shared/utils/ramda'

import { collection, Collections } from './database'
import { getUser } from './user'

export const getLastDocumentId = (email: string): Promise<Id> =>
  getUser(email).then(field('lastDocument')).then(decode(idCodec))

export const getLastDocument = (email: string): Promise<Document> =>
  getLastDocumentId(email)
    .then(id => collection(Collections.documents).findOne({ id }))
    .then(failOn<Document>(isNil, 'document not found'))
