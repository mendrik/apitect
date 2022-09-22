import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { resolvePromised } from '~shared/utils/promise'

import { collection, Collections } from '../services/database'
import { defaultProjection } from '../utils/projection'

export const valueList: ServerApiMethod<'valueList'> = async ({
  docId,
  payload: { tag, nodeIds }
}) =>
  resolvePromised({
    values: collection(Collections.values)
      .find<Value>(
        { docId, tag, nodeId: { $in: nodeIds }, arrayItemId: { $exists: false } },
        defaultProjection
      )
      .toArray()
  })
