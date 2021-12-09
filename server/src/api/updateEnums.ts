import { isNil, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Enums } from '~shared/types/domain/enums'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const updateEnums: ServerApiMethod<'updateEnums'> = ({ docId, payload: enums }) =>
  collection(Collections.enums)
    .findOneAndReplace({ docId }, { ...enums, docId }, { upsert: true, returnDocument: 'after' })
    .then(prop('value'))
    .then(failOn<Enums>(isNil, 'failed to persists project tags settings'))
