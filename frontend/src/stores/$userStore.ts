import { createStore } from 'effector'
import { User } from '~shared/types/domain/user'
import { logger } from '~shared/utils/logger'

import { whoAmIFx } from '../events/user'

export const $user = createStore<User | null>(null)
$user.on(whoAmIFx.done, (_, { result }) => result)

whoAmIFx.watch(() => logger.info('user loaded'))
