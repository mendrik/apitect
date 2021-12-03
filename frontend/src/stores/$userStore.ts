import { createStore } from 'effector'

import { whoAmIFx } from '../events/user'
import { User } from '../shared/types/domain/user'
import { logger } from '../shared/utils/logger'

export const $user = createStore<User | null>(null)
$user.on(whoAmIFx.done, (_, { result }) => result)

whoAmIFx.watch(() => logger.info('user loaded'))
