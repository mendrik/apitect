import { createEffect, sample } from 'effector'
import { Api } from '~shared/types/api'

import { $api } from '../stores/$apiStore'

const api = () => sample($api).getState()

export const valueListFx = createEffect<Api['valueList']>(req => api().valueList(req))
export const valueUpdateFx = createEffect<Api['valueUpdate']>(req => api().valueUpdate(req))
export const valueDeleteFx = createEffect<Api['valueDelete']>(req => api().valueDelete(req))
