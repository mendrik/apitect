import { createEffect, createEvent, sample } from 'effector'
import { Api } from '~shared/apiTypes'
import { $api } from '~stores/$apiStore'
import { SelectedValue } from '~stores/$valuesStore'

const api = (): Api => sample($api).getState()

export const valueListFx = createEffect<Api['valueList']>(req => api().valueList(req))
export const valueUpdateFx = createEffect<Api['valueUpdate']>(req => api().valueUpdate(req))
export const valueDeleteFx = createEffect<Api['valueDelete']>(req => api().valueDelete(req))

export const selectValue = createEvent<SelectedValue | null>('select-value')
