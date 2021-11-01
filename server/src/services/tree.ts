import { match } from 'ts-pattern'
import { Operation } from '~shared/types/clientMessages'

import { eventMap, serverState } from './serverState'

serverState.on(eventMap.NODE, (state, { send, userId, message: { operation, position } }) => {
  match(operation).with(Operation.Upsert, () => {})
})
