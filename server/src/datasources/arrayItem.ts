import { pathOr, prop } from 'ramda'
import { AnyZodObject, ZodArray } from 'zod'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Id } from '~shared/types/domain/id'
import { Node, NodeId } from '~shared/types/domain/node'
import { NotificationType } from '~shared/types/domain/notification'
import { Value } from '~shared/types/domain/values/value'
import { notificationError } from '~shared/types/notificationError'
import { nodeToJson } from '~shared/utils/nodeToJson'

import { valueList } from '../api/valueList'
import { getArrayNode } from '../services/arrayNode'
import { nodeToValidator } from '../services/validation'

const fetchValues = async (
  arrayNode: TreeNode<Node>,
  docId: string,
  email: string,
  tag: string
) => {
  const nodeIds = arrayNode.flatten().map(pathOr<NodeId>('', ['value', 'id']))
  const values: Value[] = await valueList({ docId, email, payload: { tag, nodeIds } }).then(
    prop('values')
  )
  const item = nodeToJson(arrayNode, values)
  return { values, item }
}

export const validateValues = async (
  docId: Id,
  email: string,
  tag: string,
  arrayNodeId: Id
): Promise<Value[]> => {
  const arrayNode = await getArrayNode(docId, arrayNodeId)
  const { values, item } = await fetchValues(arrayNode, docId, email, tag)
  const validator: ZodArray<AnyZodObject> = await nodeToValidator(arrayNode, docId, email)
  try {
    validator.element.parse(item)
  } catch (e) {
    throw notificationError('validation.failed', NotificationType.WARNING, JSON.stringify(e))
  }
  return values
}
