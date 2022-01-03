import { createEffect, sample } from 'effector'
import { Api } from '~shared/apiTypes'
import { $api } from '~stores/$apiStore'

const api = () => sample($api).getState()

export const arrayItemCreateFx = createEffect<Api['arrayItemCreate']>(nodeId =>
  api().arrayItemCreate(nodeId)
)
