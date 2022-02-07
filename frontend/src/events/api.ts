import { createEffect, createStore } from 'effector'
import { nthArg } from 'ramda'
import { ArgFn } from '~shared/types/generic'

export const apiFx = createEffect<ArgFn<() => Promise<any>, any>>(fn => fn())

export const $apiError = createStore<Error | null>(null).on(apiFx.failData, nthArg(1))
