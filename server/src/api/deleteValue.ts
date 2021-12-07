import { pick } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'

import { collection, Collections } from '../services/database'

export const deleteValue: ServerApiMethod<'deleteValue'> = ({ docId, payload: value }) =>
  collection(Collections.values)
    .findOneAndDelete({ docId, ...pick(['nodeId', 'tag'], value) })
    .then()
