import { ObjectId } from 'mongodb'
import { findIndex, pathEq, propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { decode } from '~shared/codecs/decode'
import { TUiDocument } from '~shared/types/domain/document'
import { TUiNode } from '~shared/types/domain/tree'
import { wrapServerMessage } from '~shared/types/serverMessages'
import { convertUnderscoreIds } from '~shared/utils/rename'

import { Node, TNode } from '../types/tree'
import { collection } from './database'
import { getLastDocument, toTreeNode } from './document'
import { eventMap, serverState } from './serverState'

// prettier-ignore
serverState.on(eventMap.NEW_NODE, (state, { send, userId, message: newNode }) => {
  void getLastDocument(userId).then(doc => {
    const tree = toTreeNode(doc.tree)
    const parent  = newNode.parentNode
      ? tree.first(propEq('_id', new ObjectId(newNode.parentNode)))!
      : tree

    const node = decode(TNode)({
      name: newNode.name,
      children: [],
      nodeType: newNode.nodeType,
      _id: new ObjectId()
    })
    parent.children.splice(parent.children.length,0, TreeNode.of<Node>(node))

    const docTree = decode(TNode)(tree.extract())

    collection('documents')
      .updateOne({ _id: doc._id }, { $set: { 'tree': docTree } })
      .then(() => getLastDocument(userId).then(wrapServerMessage(TUiDocument)))
      .then(send)
      .then(() => send({
        type: 'NODE_CREATED',
        payload: decode(TUiNode)(convertUnderscoreIds(node))
      }))
  })
})

serverState.on(
  eventMap.DEL_NODE,
  (state, { send, userId, message }) =>
    void getLastDocument(userId).then(doc => {
      const tree = toTreeNode(doc.tree)
      const nodeId = new ObjectId(message.id)
      const node = tree.first(propEq('_id', nodeId))
      const parent = node?.parent
      if (parent != null) {
        const index = findIndex(pathEq(['value', '_id'], nodeId), parent.children)
        parent.children.splice(index, 1)
        const docTree = decode(TNode)(tree.extract())
        collection('documents')
          .updateOne({ _id: doc._id }, { $set: { tree: docTree } })
          .then(() => getLastDocument(userId).then(wrapServerMessage(TUiDocument)))
          .then(send)
      }
    })
)
