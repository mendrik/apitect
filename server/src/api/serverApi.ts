import { ServerApiMethod } from '~shared/apiResponse'
import { ApiMethod } from '~shared/apiTypes'

import { arrayItemCreate } from './arrayItemCreate'
import { arrayItems } from './arrayItems'
import { enums } from './enums'
import { nodeCreate } from './nodeCreate'
import { nodeDelete } from './nodeDelete'
import { nodeSettings } from './nodeSettings'
import { project } from './project'
import { projectUsersSettings } from './projectUsersSettings'
import { renameProject } from './renameProject'
import { tagsSettings } from './tagsSettings'
import { updateEnums } from './updateEnums'
import { updateNodeSettings } from './updateNodeSettings'
import { updateProjectUsersSettings } from './updateProjectUsersSettings'
import { updateTagsSettings } from './updateTagsSettings'
import { updateUserSettings } from './updateUserSettings'
import { userSettings } from './userSettings'
import { valueDelete } from './valueDelete'
import { valueList } from './valueList'
import { valueUpdate } from './valueUpdate'

export const apiMapping: { [K in ApiMethod]: ServerApiMethod<K> } = {
  arrayItemCreate,
  arrayItems,
  enums,
  nodeCreate,
  nodeDelete,
  nodeSettings,
  project,
  projectUsersSettings,
  renameProject,
  tagsSettings,
  updateEnums,
  updateNodeSettings,
  updateProjectUsersSettings,
  updateTagsSettings,
  updateUserSettings,
  userSettings,
  valueDelete,
  valueList,
  valueUpdate
}
