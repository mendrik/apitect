import { propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { Id } from '~shared/types/domain/id'
import { Node, NodeId } from '~shared/types/domain/node'

import { getTree } from './tree'

export const getNode = async (docId: Id, id: NodeId): Promise<TreeNode<Node>> => {
  const tree = await getTree(docId)
  const node = tree.first(propEq<'id'>('id', id))
  if (node == null) {
    throw Error(`Unable to find array node ${id} in document ${docId}`)
  }
  return node
}
