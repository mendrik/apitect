import { isNil } from 'ramda'
import { Document } from '~shared/types/domain/document'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from './database'

export const getDocument = (id: string): Promise<Document> =>
  collection(Collections.documents)
    .findOne({ id }, { projection: { _id: 0 } })
    .then(failOn<Document>(isNil, 'document not found'))
