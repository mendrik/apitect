import { prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { resolvePromised } from '~shared/utils/promise'

import { getArrayItems, $getItemsTotal } from '../services/arrayItems'
import { getNode } from '../services/node'

export const arrayItems: ServerApiMethod<'arrayItems'> = async ({
  docId,
  payload: { arrayNodeId, page, pageSize, tag }
}) => {
  const arrayNode = await getNode(docId, arrayNodeId)
  const nodeIds = arrayNode.toArray().map(prop('id'))

  return resolvePromised({
    items: getArrayItems(nodeIds, tag, page, pageSize),
    pageSize,
    page,
    total: $getItemsTotal(nodeIds, tag)
  })
}
