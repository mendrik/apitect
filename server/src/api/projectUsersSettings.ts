import { ServerApiMethod } from '~shared/apiResponse'
import { ProjectUsersSettings } from '~shared/types/forms/projectUsersSettings'

import { collection, Collections } from '../services/database'
import { projection } from '../utils/projection'

export const projectUsersSettings: ServerApiMethod<'projectUsersSettings'> = ({ docId }) =>
  collection(Collections.projectUsersSettings).findOne<ProjectUsersSettings>(
    { docId },
    { projection }
  )
