import { createStore } from 'effector'
import { always, nthArg } from 'ramda'
import { User } from '~shared/types/domain/user'

import { resetUser, whoAmIFx } from '../events/user'

export const $user = createStore<User | null>(null)
  .on(whoAmIFx.doneData, nthArg(1))
  .on(resetUser, always(null))
