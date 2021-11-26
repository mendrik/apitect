import { ServerApiMethod } from '~shared/apiResponse'

import { collection, Collections } from '../services/database'
import { project } from './project'

export const updateUserSettings: ServerApiMethod<'updateUserSettings'> = ({
  docId,
  email,
  payload: userSettings
}) =>
  collection(Collections.userSettings)
    .findOneAndReplace({ docId }, { ...userSettings, docId, email }, { upsert: true })
    .then(() => project({ docId, email }))
