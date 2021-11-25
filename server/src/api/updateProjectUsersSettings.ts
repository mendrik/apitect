import { isNil, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { ProjectUsersSettings } from '~shared/types/forms/projectUsersSettings'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const updateProjectUsersSettings: ServerApiMethod<'updateProjectUsersSettings'> = ({
  docId,
  payload: projectUsersSettings
}) =>
  collection(Collections.projectUsersSettings)
    .findOneAndReplace(
      { docId: docId },
      { ...projectUsersSettings, docId },
      { upsert: true, returnDocument: 'after' }
    )
    .then(prop('value'))
    .then(failOn<ProjectUsersSettings>(isNil, 'failed to persists project user settings'))
