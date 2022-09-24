import { createEffect } from 'effector'
import { Api } from '~shared/apiTypes'

import { api } from './api'

export const arrayItemCreateFx = createEffect<Api['arrayItemCreate']>(nodeId =>
  api().arrayItemCreate(nodeId)
)

export const arrayItemsFx = createEffect<Api['arrayItems']>(req => api().arrayItems(req))
