import { ServerApiMethod } from '~shared/apiResponse'
import { ProjectUsersSettings } from '~shared/types/forms/projectUsersSettings'

import { collection, Collections } from '../services/database'

export const projectUsersSettings: ServerApiMethod<'projectUsersSettings'> = ({ docId }) =>
  collection(Collections.projectUsersSettings).findOne<ProjectUsersSettings>(
    { docId },
    { projection: { _id: 0, docId: 0 } }
  )
