import { always, isNil, prop, propEq, propSatisfies } from 'ramda'
import { ChildOperation, TreeNode } from '~shared/algebraic/treeNode'
import { decode } from '~shared/codecs/decode'
import { newId } from '~shared/codecs/idCodec'
import { Document } from '~shared/types/domain/document'
import { Node, TNode } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'

import { collection } from './database'
import { getLastDocument, toTreeNode } from './document'
import { eventMap, serverState } from './serverState'
import { Send } from './websocket'

const withTree =
  (send: Send, email: string) =>
  <T extends Node>(fn: (root: TreeNode<Node>) => ChildOperation<T>): Promise<ChildOperation<T>> =>
    getLastDocument(email).then(doc => {
      const tree = toTreeNode(doc.tree)
      const res = fn(tree)
      const docTree = decode(TNode)(res.self.extract())
      return collection('documents')
        .findOneAndUpdate(
          { id: doc.id },
          { $set: { tree: docTree } },
          { returnDocument: 'after', projection: { _id: 0 } }
        )
        .then(prop('value'))
        .then(failOn<Document>(isNil, 'document not found'))
        .then(send('DOCUMENT'))
        .then(always(res))
    })

const validateTree = <T extends Node>(ops: ChildOperation<T>): ChildOperation<T> => {
  return ops
}

serverState.on(
  eventMap.NEW_NODE,
  (state, { send, email, message: newNode }) =>
    void withTree(
      send,
      email
    )(root =>
      root.insert(propEq('id', newNode.parentNode), {
        id: newId(),
        name: newNode.name,
        children: [],
        nodeType: newNode.nodeType
      })
    )
      .then(validateTree)
      .then(o => o.node)
      .then(failOn<Node>(isNil, 'Node not found'))
      .then(send('NODE_CREATED'))
)

serverState.on(
  eventMap.DEL_NODE,
  (state, { send, email, message }) =>
    void withTree(
      send,
      email
    )(root => root.delete(propEq('id', message.id)))
      .then(failOn<ChildOperation<Node>>(propSatisfies(isNil, 'node'), 'Node not found'))
      .then(validateTree)
      .then(o => ({
        position: o.position!,
        parentNode: o.parent!.id
      }))
      .then(send('NODE_DELETED'))
)
