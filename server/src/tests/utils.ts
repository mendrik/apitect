import { propEq } from 'ramda'
import { NodeId } from '~shared/types/domain/node'

import { valueUpdate } from '../api/valueUpdate'
import { getTree } from '../services'
import { existsOrThrow } from '../utils/maybe'
import { docId, email, tag } from './fixtureContants'

export const addValue = async (nodeId: NodeId, value: string) => {
  const tree = await getTree(docId)
  const node = existsOrThrow(tree.first(propEq('id', nodeId)))
  await valueUpdate({
    docId,
    email,
    payload: {
      tag,
      author: email,
      published: true,
      nodeType: node.value.nodeType as any,
      owner: email,
      nodeId,
      value
    }
  })
}
