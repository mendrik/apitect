import { WithId } from 'mongodb'
import { isNil } from 'ramda'
import { User } from '~shared/types/domain/user'
import { failOn } from '~shared/utils/failOn'

import { collection } from './database'

export const getUser = (email: string): Promise<WithId<User>> =>
  collection('users')
    .findOne({ email }, { projection: { password: 0, token: 0 } })
    .then(failOn<WithId<User>>(isNil, 'user not found'))
