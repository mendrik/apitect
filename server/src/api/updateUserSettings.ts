import { isNil, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { UserSettings } from '~shared/types/forms/userSettings'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const updateUserSettings: ServerApiMethod<'updateUserSettings'> = ({
  docId,
  email,
  payload: userSettings
}) =>
  collection(Collections.userSettings)
    .findOneAndReplace(
      { docId },
      { ...userSettings, docId, email },
      { upsert: true, returnDocument: 'after' }
    )
    .then(prop('value'))
    .then(failOn<UserSettings>(isNil, 'failed to persist user settings'))
