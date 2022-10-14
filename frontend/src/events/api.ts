import { sample } from 'effector'
import { createEffect, createStore } from 'effector'
import { nthArg } from 'ramda'
import { Api } from '~shared/apiTypes'
import { ArgFn } from '~shared/types/generic'
import { $api } from '~stores/$apiStore'

export const apiFx = createEffect<ArgFn<() => Promise<any>, any>>(fn => fn())

export const $apiError = createStore<Error | null>(null).on(apiFx.failData, nthArg(1))

export const api = (): Api => sample({ source: $api }).getState()
