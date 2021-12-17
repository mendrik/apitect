import { createEffect, createEvent, sample } from 'effector'
import { Api } from '~shared/types/api'
import { $api } from '~stores/$apiStore'

export const arrayDrawerState = createEvent<boolean>('open-array-drawer')

const api = () => sample($api).getState()

export const projectFx = createEffect<Api['createArrayItem']>(async () => undefined)
