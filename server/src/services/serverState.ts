import { createEffect, createEvent, createStore } from 'effector'
import { MongoClient } from 'mongodb'
import { ApiRequest } from '~shared/types/apiRequest'
import { Maybe } from '~shared/types/generic'

import { connect } from './database'

type ServerState = {
  database: Maybe<MongoClient>
}

export const serverState = createStore<ServerState>({
  database: null
})

export const apiCall = createEvent<ApiRequest>()
export const initDatabase = createEffect(() => connect())

serverState.on(initDatabase.doneData, (state, database) => ({ ...state, database }))
