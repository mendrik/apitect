import { always, findIndex, isNil, pathEq, prop, propEq } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { decode } from '~shared/codecs/decode'
import { newId } from '~shared/codecs/idCodec'
import { Document } from '~shared/types/domain/document'
import { Id } from '~shared/types/domain/id'
import { Node, TNode } from '~shared/types/domain/tree'
import { Maybe } from '~shared/types/generic'
import { failOn } from '~shared/utils/failOn'

import { collection } from './database'
import { getLastDocument, toTreeNode } from './document'
import { eventMap, serverState } from './serverState'
import { Send } from './websocket'

const withNode =
  (send: Send, email: string, nodeId?: Id) =>
  <T>(fn: (node: Maybe<TreeNode<Node>>, root: TreeNode<Node>) => T): Promise<T> =>
    getLastDocument(email).then(doc => {
      const tree = toTreeNode(doc.tree)
      const node = tree.first(propEq('id', nodeId))
      const res = fn(node, tree) // todo: make this FP immutable
      const docTree = decode(TNode)(tree.extract())
      return collection('documents')
        .findOneAndUpdate(
          doc._id,
          { $set: { tree: docTree } },
          { returnDocument: 'after', projection: { _id: 0 } }
        )
        .then(prop('value'))
        .then(failOn<Document>(isNil, 'document not found'))
        .then(send('DOCUMENT'))
        .then(always(res))
    })

serverState.on(
  eventMap.NEW_NODE,
  (state, { send, email, message: newNode }) =>
    void withNode(
      send,
      email,
      newNode.parentNode
    )((maybeParent, root) => {
      const parent = maybeParent ?? root
      const node = decode(TNode)({
        id: newId(),
        name: newNode.name,
        children: [],
        nodeType: newNode.nodeType
      })
      // todo support position
      parent.children.splice(parent.children.length, 0, TreeNode.of<Node>(node))
      return node
    }).then(send('NODE_CREATED'))
)

serverState.on(
  eventMap.DEL_NODE,
  (state, { send, email, message }) =>
    void withNode(
      send,
      email,
      message.id
    )(node => {
      if (node?.parent != null) {
        const parent = node.parent
        const position = findIndex(pathEq(['value', 'id'], node.value.id), parent.children)
        parent.children.splice(position, 1)
        return { parentNode: parent.value.id, position }
      } else {
        throw Error('delete node exception: parent not found in tree')
      }
    }).then(send('NODE_DELETED'))
)
