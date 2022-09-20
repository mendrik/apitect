import { pathOr, prop, propEq } from 'ramda'
import { AnyZodObject, ZodArray } from 'zod'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Id } from '~shared/types/domain/id'
import { Node, NodeId } from '~shared/types/domain/node'
import { NotificationType } from '~shared/types/domain/notification'
import { Value } from '~shared/types/domain/values/value'
import { notificationError } from '~shared/types/notificationError'
import { nodeToJson } from '~shared/utils/nodeToJson'
import { mapByProperty } from '~shared/utils/ramda'

import { valueList } from '../api/valueList'
import { getTree } from '../services'
import { nodeToValidator } from '../services/validation'

export const asJson = async (
  arrayNode: TreeNode<Node>,
  docId: string,
  email: string,
  tag: string
) => {
  const nodeIds = arrayNode.flatten().map(pathOr<NodeId>('', ['value', 'id']))
  const values: Record<NodeId, Value> = await valueList({ docId, email, payload: { tag, nodeIds } })
    .then(prop('values'))
    .then(mapByProperty('nodeId'))
  const item = nodeToJson(arrayNode, values)
  return { values, item }
}

export const validateValues = async (
  docId: Id,
  email: string,
  tag: string,
  arrayNodeId: Id
): Promise<Record<NodeId, Value>> => {
  const tree = await getTree(docId)
  const arrayNode = tree.first(propEq<'id'>('id', arrayNodeId))
  if (arrayNode == null) {
    throw Error(`Unable to find array node ${arrayNodeId} in document ${docId}`)
  }
  const { values, item } = await asJson(arrayNode, docId, email, tag)
  const validator: ZodArray<AnyZodObject> = await nodeToValidator(arrayNode, docId, email)
  try {
    validator.element.parse(item)
  } catch (e) {
    throw notificationError('validation.failed', NotificationType.WARNING, JSON.stringify(e))
  }
  return values
}
