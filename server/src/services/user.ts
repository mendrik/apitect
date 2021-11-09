import { ObjectId } from 'mongodb'
import { isNil } from 'ramda'
import { failOn } from '~shared/utils/failOn'

import { User } from '../types/user'
import { collection } from './database'

// prettier-ignore
export const getUser = (userId: ObjectId): Promise<User> =>
  collection('users')
    .findOne({ _id: userId })
    .then(failOn<User>(isNil, 'user not found'))
