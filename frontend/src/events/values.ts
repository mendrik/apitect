import { createEffect, createEvent } from 'effector'
import { Api } from '~shared/apiTypes'
import { SelectedValue } from '~stores/$valuesStore'

import { api } from './api'

export const valueListFx = createEffect<Api['valueList']>(req => api().valueList(req))
export const valueUpdateFx = createEffect<Api['valueUpdate']>(req => api().valueUpdate(req))
export const valueDeleteFx = createEffect<Api['valueDelete']>(req => api().valueDelete(req))

export const selectValue = createEvent<SelectedValue | null>('select-value')
