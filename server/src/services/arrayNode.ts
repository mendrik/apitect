import { propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Id } from '~shared/types/domain/id'
import { Node } from '~shared/types/domain/node'

import { getTree } from './tree'

export const getArrayNode = async (docId: Id, arrayNodeId: Id): Promise<TreeNode<Node>> => {
  const tree = await getTree(docId)
  const arrayNode = tree.first(propEq<'id'>('id', arrayNodeId))
  if (arrayNode == null) {
    throw Error(`Unable to find array node ${arrayNodeId} in document ${docId}`)
  }
  return arrayNode
}
