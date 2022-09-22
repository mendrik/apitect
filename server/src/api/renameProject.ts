import { ServerApiMethod } from '~shared/apiResponse'

import { renameProject as renameProjectService } from '../services/project'

export const renameProject: ServerApiMethod<'renameProject'> = ({ docId, payload }) =>
  renameProjectService(docId, payload)
