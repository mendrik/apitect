import { createStore } from 'effector'
import { nthArg } from 'ramda'
import { User } from '~shared/types/domain/user'

import { whoAmIFx } from '../events/user'

export const $user = createStore<User | null>(null)
$user.on(whoAmIFx.doneData, nthArg(1))
