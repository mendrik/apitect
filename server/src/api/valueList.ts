import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { resolvePromised } from '~shared/utils/promise'

import { collection, Collections } from '../services/database'

export const valueList: ServerApiMethod<'valueList'> = async ({
  docId,
  payload: { tag, nodeIds }
}) => {
  const values = collection(Collections.values)
    .find<Value>({ docId, tag, nodeId: { $in: nodeIds } })
    .toArray()
  const nodeSettings = collection(Collections.nodeSettings)
    .find<NodeSettings>({ docId, nodeId: { $in: nodeIds } })
    .toArray()
  return resolvePromised({
    values,
    nodeSettings
  })
}
