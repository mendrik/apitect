import { createEffect, createEvent, createStore } from 'effector'
import { MongoClient } from 'mongodb'
import { ApiCallRequest } from '~shared/types/apiCall'
import { Maybe } from '~shared/types/generic'

import { connect } from './database'

type ServerState = {
  database: Maybe<MongoClient>
}

export const serverState = createStore<ServerState>({
  database: null
})

export const apiCall = createEvent<ApiCallRequest>()
export const initDatabase = createEffect(() => connect())

serverState.on(initDatabase.doneData, (state, database) => ({ ...state, database }))
