import { always, isNil, prop } from 'ramda'
import { ChildOperation, TreeNode } from '~shared/algebraic/treeNode'
import { Document } from '~shared/types/domain/document'
import { Node, ZNode } from '~shared/types/domain/node'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from './database'
import { getDocument } from './document'

export const withTree =
  (docId: string) =>
  <T extends Node>(fn: (root: TreeNode<Node>) => ChildOperation<T>): Promise<ChildOperation<T>> =>
    getDocument(docId).then(async doc => {
      const tree = toTreeNode(doc.tree)
      const res = await fn(tree)
      const docTree = ZNode.parse(res.self.extract())
      return collection(Collections.documents)
        .findOneAndUpdate(
          { id: doc.id },
          { $set: { tree: docTree } },
          { returnDocument: 'after', projection: { _id: 0 } }
        )
        .then(prop('value'))
        .then(failOn<Document>(isNil, 'document not found'))
        .then(always(res))
    })

export const validateTree = <T extends Node>(ops: ChildOperation<T>): ChildOperation<T> => ops

export const toTreeNode = (node: Node) => TreeNode.from<Node, 'children'>('children')(node)

export const getTree = (docId: string): Promise<TreeNode<Node>> =>
  getDocument(docId).then(prop('tree')).then(toTreeNode)
