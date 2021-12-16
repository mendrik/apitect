import { createStore } from 'effector'
import { F, T } from 'ramda'

import { closeArrayDrawer, openArrayDrawer } from '../events/array'
import { resetProject } from '../events/reset'

export const $arrayDrawer = createStore<boolean>(false)
  .on(openArrayDrawer, T)
  .on(closeArrayDrawer, F)
  .reset(resetProject)
