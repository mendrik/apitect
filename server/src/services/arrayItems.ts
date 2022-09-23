import { groupBy, length, mapObjIndexed, prop, values } from 'ramda'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'

import { projection } from '../utils/projection'
import { collection, Collections } from './database'
import { getNode } from './node'

export const $getItemsTotal = (nodeIds: NodeId[], tag: TagName): Promise<number> =>
  collection(Collections.values)
    .distinct('arrayItemId', {
      tag,
      nodeId: { $in: nodeIds },
      arrayItemId: { $exists: true }
    })
    .then(length)

export const getItemsTotal = async (
  docId: string,
  arrayNodeId: NodeId,
  tag: TagName
): Promise<number> => {
  const arrayNode = await getNode(docId, arrayNodeId)
  const nodeIds = arrayNode.toArray().map(prop('id'))
  return $getItemsTotal(nodeIds, tag)
}

export const getArrayItems = async (
  nodeIds: NodeId[],
  tag: TagName,
  page: number,
  pageSize: number
): Promise<Item[]> =>
  collection(Collections.values)
    .find<Value>(
      {
        tag,
        nodeId: { $in: nodeIds },
        arrayItemId: { $exists: true }
      },
      projection
    )
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray()
    .then(groupBy(prop('arrayItemId')))
    .then(mapObjIndexed((values, id) => ({ id, values })))
    .then(values)
