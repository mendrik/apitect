import { ServerApiMethod } from '~shared/apiResponse'
import { UserSettings } from '~shared/types/forms/userSettings'

import { collection, Collections } from '../services/database'

export const userSettings: ServerApiMethod<'userSettings'> = ({ docId, email }) =>
  collection(Collections.userSettings).findOne<UserSettings>(
    { docId, email },
    { projection: { _id: 0, docId: 0, email: 0 } }
  )
