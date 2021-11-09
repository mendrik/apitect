import { ObjectId } from 'mongodb'
import { propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { decode } from '~shared/codecs/decode'

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

    parent.children.splice(parent.children.length,0, TreeNode.of<Node>({
      name: newNode.name,
      children: [],
      nodeType: newNode.nodeType,
      _id: new ObjectId()
    }))

    const docTree = decode(TNode)(tree.extract())

    return collection('documents')
      .updateOne({ _id: doc._id }, { $set: { 'tree': docTree } })
  })
})
