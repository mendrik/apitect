import { isNil, pick, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const deleteValue: ServerApiMethod<'deleteValue'> = ({ docId, payload: value }) =>
  collection(Collections.values)
    .findOneAndDelete({ docId, ...pick(['nodeId', 'tag'], value) })
    .then(prop('value'))
    .then(failOn<Value>(isNil, `Failed to delete value`))
