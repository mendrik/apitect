import { isNil } from 'ramda'
import { User } from '~shared/types/domain/user'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from './database'

export const getUser = (email: string): Promise<User> =>
  collection(Collections.users)
    .findOne({ email }, { projection: { password: 0, token: 0, _id: 0 } })
    .then(failOn<User>(isNil, 'user not found'))
