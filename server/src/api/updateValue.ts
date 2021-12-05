import { isNil, pick, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const updateValue: ServerApiMethod<'updateValue'> = ({ docId, payload: value }) =>
  collection(Collections.values)
    .findOneAndReplace(
      { docId, ...pick(['nodeId', 'tag'], value) },
      { ...value },
      { upsert: true, returnDocument: 'after' }
    )
    .then(prop('value'))
    .then(failOn<Value>(isNil, `Failed to persist value`))
