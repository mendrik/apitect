import { prop } from 'ramda'
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { TagName } from '~shared/types/domain/tag'

import { defaultProjection } from '../utils/projection'
import { getArrayNode } from './arrayNode'
import { collection, Collections } from './database'

export const getItemsTotal = (docId: Id, tag: TagName, arrayNodeId: NodeId): Promise<number> =>
  Promise.resolve(0)

export const getArrayItems = async (
  docId: Id,
  tag: TagName,
  arrayNodeId: NodeId,
  page: number,
  pageSize: number
): Promise<Item[]> => {
  const arrayNode = await getArrayNode(docId, arrayNodeId)
  const nodeIds = arrayNode.toArray().map(prop('id'))

  const values = collection(Collections.values).find(
    { docId, nodeId: { $in: nodeIds } },
    defaultProjection
  )

  return []
}
