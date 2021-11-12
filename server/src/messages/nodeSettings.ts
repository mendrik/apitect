import { assoc, propEq } from 'ramda'

import { eventMap, serverState, withTree } from '../services'

serverState.on(eventMap.NODE_SETTINGS, (state, { send, email, message }) => {
  withTree(
    send,
    email
  )(root => {
    return root.update(propEq('id', message.nodeId), assoc('name', message.name))
  })
})
