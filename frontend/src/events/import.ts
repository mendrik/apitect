import { createEffect, createEvent, createStore } from 'effector'
import { nthArg, prop } from 'ramda'
import { ArgFn } from '~shared/types/generic'

import { ModalFC } from '../components/ModalStub'

export type Import<T> = () => Promise<{ default: T }>

export const loadModuleFx = createEffect<ArgFn<Import<any>, any>>(work =>
  work().then(prop('default'))
)

export const clearModuleFx = createEvent()

export const $moduleStore = createStore<ModalFC | null>(null)
  .on(loadModuleFx.doneData, nthArg(1))
  .reset(clearModuleFx)
