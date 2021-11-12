import { isNil, propEq, propSatisfies } from 'ramda'
import { ChildOperation } from '~shared/algebraic/treeNode'
import { Node } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'

import { eventMap, serverState, validateTree, withTree } from '../services'

serverState.on(
  eventMap.DELETE_NODE,
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
