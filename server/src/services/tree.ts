import { always, isNil, prop } from 'ramda'
import { ChildOperation, TreeNode } from '~shared/algebraic/treeNode'
import { ApiMethod } from '~shared/api'
import { Respond } from '~shared/apiResponse'
import { decode } from '~shared/codecs/decode'
import { Document } from '~shared/types/domain/document'
import { Node, TNode } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from './database'
import { getLastDocument } from './document'

export const withTree =
  (respond: Respond<ApiMethod>, email: string) =>
  <T extends Node>(fn: (root: TreeNode<Node>) => ChildOperation<T>): Promise<ChildOperation<T>> =>
    getLastDocument(email).then(doc => {
      const tree = toTreeNode(doc.tree)
      const res = fn(tree)
      const docTree = decode(TNode)(res.self.extract())
      return collection(Collections.documents)
        .findOneAndUpdate(
          { id: doc.id },
          { $set: { tree: docTree } },
          { returnDocument: 'after', projection: { _id: 0 } }
        )
        .then(prop('value'))
        .then(failOn<Document>(isNil, 'document not found'))
        .then(respond)
        .then(always(res))
    })

export const validateTree = <T extends Node>(ops: ChildOperation<T>): ChildOperation<T> => {
  return ops
}

export const toTreeNode = (node: Node) => TreeNode.from<Node, 'children'>('children')(node)
