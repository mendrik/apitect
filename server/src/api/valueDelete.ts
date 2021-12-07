import { pick, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { Fn } from '~shared/types/generic'

import { collection, Collections } from '../services/database'

export const valueDelete: ServerApiMethod<'valueDelete'> = ({ docId, payload: value }) =>
  collection(Collections.values)
    .findOneAndDelete({ docId, ...pick(['nodeId', 'tag'], value) })
    .then(prop('value') as Fn<Value>)
