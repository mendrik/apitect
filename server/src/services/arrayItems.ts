import { groupBy, mapObjIndexed, prop } from 'ramda'
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { TagName } from '~shared/types/domain/tag'
import { Value } from '~shared/types/domain/values/value'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'
import { nodeToJson } from '~shared/utils/nodeToJson'
import { mapByProperty } from '~shared/utils/ramda'

import { nodeSettings } from '../api/nodeSettings'
import { projection } from '../utils/projection'
import { getArrayNode } from './arrayNode'
import { collection, Collections } from './database'

export const getItemsTotal = (docId: Id, tag: TagName, arrayNodeId: NodeId): Promise<number> =>
  Promise.resolve(0)

const displayString = (format: string, item: Record<string, any>) => 'format'

export const getArrayItems = async (
  docId: Id,
  email: string,
  tag: TagName,
  arrayNodeId: NodeId,
  page: number,
  pageSize: number
): Promise<Item[]> => {
  const arrayNode = await getArrayNode(docId, arrayNodeId)
  const arraySettings = (await nodeSettings({
    docId,
    email,
    payload: arrayNodeId
  })) as ArraySettings
  const nodeIds = arrayNode.toArray().map(prop('id'))

  const values = await collection(Collections.values)
    .find<Value>(
      { docId, tag, nodeId: { $in: nodeIds }, arrayItemId: { $exists: true } },
      projection
    )
    .skip(page * pageSize)
    .limit(pageSize)
    .toArray()
    .then(groupBy(prop('arrayItemId')))

  const items = mapObjIndexed((values: Value[], arrayItemId: string) => {
    const valueMap = mapByProperty('nodeId')(values)
    const item = nodeToJson(arrayNode, valueMap)
    return {
      id: arrayItemId,
      displayString: displayString(arraySettings.displayFormat, item),
      ...item
    } as Item
  })(values)
  return Object.values(items)
}
