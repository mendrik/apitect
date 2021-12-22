import { pathOr, prop, propEq } from 'ramda'
import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { logger } from '~shared/utils/logger'
import { nodeToJson } from '~shared/utils/nodeToJson'
import { byProp } from '~shared/utils/ramda'

import { valueList } from '../api/valueList'
import { getTree } from '../services'
import { getNodeValidator } from '../services/validation'

export const getArrayItem = async <T>(
  docId: Id,
  email: string,
  tag: string,
  arrayNodeId: Id
): Promise<T> => {
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
    .then(byProp('nodeId'))
  const item = nodeToJson(node, values)
  const validator = await getNodeValidator(docId, email, node.value.id)
  return validator.parse(item) as T
}
