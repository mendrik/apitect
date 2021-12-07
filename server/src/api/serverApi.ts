import { ServerApiMethod } from '~shared/apiResponse'
import { ApiMethod } from '~shared/types/api'

import { nodeCreate } from './nodeCreate'
import { nodeDelete } from './nodeDelete'
import { nodeSettings } from './nodeSettings'
import { project } from './project'
import { projectUsersSettings } from './projectUsersSettings'
import { tagsSettings } from './tagsSettings'
import { updateNodeSettings } from './updateNodeSettings'
import { updateProjectUsersSettings } from './updateProjectUsersSettings'
import { updateTagsSettings } from './updateTagsSettings'
import { updateUserSettings } from './updateUserSettings'
import { userSettings } from './userSettings'
import { valueDelete } from './valueDelete'
import { valueList } from './valueList'
import { valueUpdate } from './valueUpdate'

export const apiMapping: { [K in ApiMethod]: ServerApiMethod<K> } = {
  valueDelete,
  nodeCreate,
  nodeDelete,
  nodeSettings,
  project,
  projectUsersSettings,
  tagsSettings,
  updateNodeSettings,
  updateProjectUsersSettings,
  updateTagsSettings,
  updateUserSettings,
  valueUpdate,
  userSettings,
  valueList
}
