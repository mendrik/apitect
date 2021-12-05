import { createStore } from 'effector'
import { User } from '~shared/types/domain/user'

import { whoAmIFx } from '../events/user'

export const $user = createStore<User | null>(null)
$user.on(whoAmIFx.done, (_, { result }) => result)
