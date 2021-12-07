import { isNil, pick, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const valueUpdate: ServerApiMethod<'valueUpdate'> = ({ docId, email, payload: value }) =>
  collection(Collections.values)
    .findOneAndUpdate(
      { docId, ...pick(['nodeId', 'tag'], value) },
      { $set: { ...value, author: email, published: true } }, // todo publishing
      { upsert: true, returnDocument: 'after' }
    )
    .then(prop('value'))
    .then(failOn<Value>(isNil, `Failed to persist value`))
