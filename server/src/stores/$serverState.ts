import { createEffect, createStore } from 'effector'
import { MongoClient } from 'mongodb'
import { Maybe } from '~shared/types/generic'

import { connect } from '../services/database'

type ServerState = {
  database: Maybe<MongoClient>
}

export const $serverState = createStore<ServerState>({
  database: null
})

export const initDatabaseFx = createEffect(() => connect())

$serverState.on(initDatabaseFx.doneData, (state, database) => ({ ...state, database }))
