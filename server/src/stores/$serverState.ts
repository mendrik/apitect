import { createEffect, createStore } from 'effector'
import { MongoClient } from 'mongodb'
import { ArgFn, Maybe } from '~shared/types/generic'

import { connect } from '../services/database'

type ServerState = {
  database: Maybe<MongoClient>
}

export const $serverState = createStore<ServerState>({
  database: null
})

export const initDatabaseFx = createEffect<ArgFn<string, Promise<MongoClient>>>(connect)

$serverState.on(initDatabaseFx.doneData, (state, database) => ({ ...state, database }))
