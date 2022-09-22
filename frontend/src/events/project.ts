import { createEffect } from 'effector'
import { Api } from '~shared/apiTypes'

import { api } from './api'

export const projectFx = createEffect<Api['project']>(() => api().project())
