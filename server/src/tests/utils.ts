import { isNil } from 'ramda'
import { NodeId } from '~shared/types/domain/node'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { failOn } from '~shared/utils/failOn'

import { nodeSettings } from '../api/nodeSettings'
import { valueUpdate } from '../api/valueUpdate'
import { docId, email, tag } from './fixtureContants'

export const addValue = async (nodeId: NodeId, value: string) => {
  const node = await nodeSettings({ docId, email, payload: nodeId }).then(
    failOn<NodeSettings>(isNil, `No node found for nodeId ${nodeId}`)
  )
  await valueUpdate({
    docId,
    email,
    payload: {
      tag,
      author: email,
      published: true,
      nodeType: node.nodeType as any,
      owner: email,
      nodeId,
      value
    }
  })
}
