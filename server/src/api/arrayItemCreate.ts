import { pathOr, prop, propEq } from 'ramda'
import { v4 as uuid } from 'uuid'
import { ServerApiMethod } from '~shared/apiResponse'
import { NodeId, Node } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ArraySettings, DataSource } from '~shared/types/forms/nodetypes/arraySettings'
import { logger } from '~shared/utils/logger'
import { byProp } from '~shared/utils/ramda'

import { getTree } from '../services'
import { collection, Collections } from '../services/database'
import { getNodeValidator } from '../services/validation'
import { nodeSettings } from './nodeSettings'
import { valueList } from './valueList'

export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  email,
  payload: { arrayNodeId, tag }
}) => {
  const arraySettings = (await nodeSettings({
    docId,
    email,
    payload: arrayNodeId
  })) as ArraySettings
  const tree = await getTree(docId)
  const node = tree.first(propEq<string>('nodeId', arrayNodeId))
  if (node == null) {
    throw Error(`Unable to find node ${arrayNodeId} in document ${docId}`)
  }
  const nodeIds = tree.flatten().map(pathOr<NodeId>('', ['value', 'id']))
  if (arraySettings.dataSource === DataSource.Internal) {
    const arrayItemId = uuid()
    const values: Record<string, Value> = await valueList({
      docId,
      email,
      payload: { tag, nodeIds }
    })
      .then(prop('values'))
      .then(byProp('nodeId'))

    const item = node.map((n: Node) => values[n.id]!.value)

    const validator = await getNodeValidator(docId, email, node.value.id)
    await collection(Collections.values).findOneAndUpdate(
      {
        docId,
        tag,
        nodeId: { $in: nodeIds },
        arrayItemId: undefined
      },
      { $set: { arrayItemId } }
    )
  }
  logger.info('created', { docId, arrayNodeId, tag, arraySettings })
  return undefined
}
