import { createEffect, sample } from 'effector'
import { Api } from '~shared/types/api'
import { $api } from '~stores/$apiStore'

const api = () => sample($api).getState()

export const createArrayItemFx = createEffect<Api['createArrayItem']>(nodeId =>
  api().createArrayItem(nodeId)
)
