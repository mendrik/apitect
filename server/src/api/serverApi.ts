import { ServerApiMethod } from '~shared/apiResponse'
import { ApiMethod } from '~shared/types/api'

import { deleteValue } from './deleteValue'
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
import { updateValue } from './updateValue'
import { userSettings } from './userSettings'
import { valueList } from './valueList'

export const apiMapping: { [K in ApiMethod]: ServerApiMethod<K> } = {
  deleteValue,
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
  updateValue,
  userSettings,
  valueList
}
