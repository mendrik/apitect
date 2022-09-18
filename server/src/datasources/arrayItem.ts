import { pathOr, prop, propEq } from 'ramda'
import { AnyZodObject, ZodArray } from 'zod'
import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { NotificationType } from '~shared/types/domain/notification'
import { Value } from '~shared/types/domain/values/value'
import { notificationError } from '~shared/types/notificationError'
import { nodeToJson } from '~shared/utils/nodeToJson'
import { mapByProperty } from '~shared/utils/ramda'

import { valueList } from '../api/valueList'
import { getTree } from '../services'
import { nodeToValidator } from '../services/validation'

export const validateValues = async (
  docId: Id,
  email: string,
  tag: string,
  arrayNodeId: Id
): Promise<Record<NodeId, Value>> => {
  const tree = await getTree(docId)
  const node = tree.first(propEq<'id'>('id', arrayNodeId))
  if (node == null) {
    throw Error(`Unable to find node ${arrayNodeId} in document ${docId}`)
  }
  const nodeIds = node.flatten().map(pathOr<NodeId>('', ['value', 'id']))
  const values: Record<NodeId, Value> = await valueList({
    docId,
    email,
    payload: { tag, nodeIds }
  })
    .then(prop('values'))
    .then(mapByProperty('nodeId'))
  const item = nodeToJson(node, values)
  const validator: ZodArray<AnyZodObject> = await nodeToValidator(node, docId, email)
  try {
    validator.element.parse(item)
  } catch (e) {
    throw notificationError('validation.failed', NotificationType.WARNING, JSON.stringify(e))
  }
  return values
}
