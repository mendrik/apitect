import { groupBy, map, pipe, prop } from 'ramda'
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'
import { logger } from '~shared/utils/logger'

import { projection } from '../utils/projection'
import { getArrayNode } from './arrayNode'
import { collection, Collections } from './database'

export const getItemsTotal = (docId: Id, tag: TagName, arrayNodeId: NodeId): Promise<number> =>
  Promise.resolve(0)

type p0 = Value[]
type p1 = Record<NodeId, Value[]>
type p2 = Record<NodeId, Record<NodeId, Value[]>>

export const getArrayItems = async (
  docId: Id,
  tag: TagName,
  arrayNodeId: NodeId,
  page: number,
  pageSize: number
): Promise<Item[]> => {
  const arrayNode = await getArrayNode(docId, arrayNodeId)
  const nodeIds = arrayNode.toArray().map(prop('id'))

  const values = await collection(Collections.values)
    .find({ docId, nodeId: { $in: nodeIds } }, projection)
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray()

  // prettier-ignore
  const valueMap = pipe(
    groupBy(prop('arrayItemId')),
    map(groupBy(prop('nodeId'))) as any
  )(values as any)

  logger.info('values', { values })

  return []
}
