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
import { updateValue } from './updateValue'
import { userSettings } from './userSettings'
import { valueList } from './valueList'

export const apiMapping: { [K in ApiMethod]: ServerApiMethod<K> } = {
  project,
  nodeCreate,
  nodeDelete,
  updateNodeSettings,
  nodeSettings,
  updateProjectUsersSettings,
  projectUsersSettings,
  tagsSettings,
  updateTagsSettings,
  userSettings,
  updateUserSettings,
  valueList,
  updateValue
}
