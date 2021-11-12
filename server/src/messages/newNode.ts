import { isNil, propEq } from 'ramda'
import { newId } from '~shared/codecs/idCodec'
import { Node } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'

import { eventMap, serverState, validateTree, withTree } from '../services/'

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
