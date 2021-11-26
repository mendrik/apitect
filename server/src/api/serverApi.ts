import { ApiMethod } from '~shared/api'
import { ServerApiMethod } from '~shared/apiResponse'

import { document } from './document'
import { nodeCreate } from './nodeCreate'
import { nodeDelete } from './nodeDelete'
import { nodeSettings } from './nodeSettings'
import { projectUsersSettings } from './projectUsersSettings'
import { tagsSettings } from './tagsSettings'
import { updateNodeSettings } from './updateNodeSettings'
import { updateProjectUsersSettings } from './updateProjectUsersSettings'
import { updateTagsSettings } from './updateTagsSettings'

export const apiMapping: { [K in ApiMethod]: ServerApiMethod<K> } = {
  document,
  nodeCreate,
  nodeDelete,
  updateNodeSettings,
  nodeSettings,
  updateProjectUsersSettings,
  projectUsersSettings,
  tagsSettings,
  updateTagsSettings
}
