import { ObjectId } from 'mongodb'
import { always, findIndex, pathEq, propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { decode } from '~shared/codecs/decode'
import { TUiDocument } from '~shared/types/domain/document'
import { TUiNode } from '~shared/types/domain/tree'
import { Maybe } from '~shared/types/generic'
import { wrapServerMessage } from '~shared/types/serverMessages'
import { convertUnderscoreIds } from '~shared/utils/rename'

import { Send } from '../server'
import { Node, TNode } from '../types/tree'
import { collection } from './database'
import { getLastDocument, toTreeNode } from './document'
import { eventMap, serverState } from './serverState'

const withNode =
  (send: Send, userId: ObjectId, nodeId?: string) =>
  <T>(fn: (node: Maybe<TreeNode<Node>>, root: TreeNode<Node>) => T): Promise<T> =>
    getLastDocument(userId).then(doc => {
      const tree = toTreeNode(doc.tree)
      const node = tree.first(propEq('_id', new ObjectId(nodeId)))
      const res = fn(node, tree)
      const docTree = decode(TNode)(tree.extract())
      return collection('documents')
        .updateOne({ _id: doc._id }, { $set: { tree: docTree } })
        .then(() => getLastDocument(userId).then(wrapServerMessage(TUiDocument)))
        .then(send)
        .then(always(res))
    })

// prettier-ignore
serverState.on(eventMap.NEW_NODE, (state, { send, userId, message: newNode }) =>
  void withNode(send, userId, newNode.parentNode)((maybeParent, root) => {
    const parent = maybeParent ?? root
    const node = decode(TNode)({
      name: newNode.name,
      children: [],
      nodeType: newNode.nodeType,
      _id: new ObjectId()
    })
    // todo support position
    parent.children.splice(parent.children.length,0, TreeNode.of<Node>(node))
    return node
  })
  .then(node => send({
    type: 'NODE_CREATED',
    payload: decode(TUiNode)(convertUnderscoreIds(node))
  })))

serverState.on(
  eventMap.DEL_NODE,
  (state, { send, userId, message }) =>
    void withNode(
      send,
      userId,
      message.id
    )(node => {
      const parent = node?.parent
      if (parent != null) {
        const index = findIndex(pathEq(['value', '_id'], node!.value._id), parent.children)
        parent.children.splice(index, 1)
      }
    })
)
