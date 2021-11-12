import { ApiMethod } from '~shared/api'
import { ServerApiMethod } from '~shared/apiResponse'

import { document } from './document'
import { nodeCreate } from './nodeCreate'
import { nodeDelete } from './nodeDelete'
import { nodeSettings } from './nodeSettings'
import { updateNodeSettings } from './updateNodeSettings'

export const apiMapping: { [K in ApiMethod]: ServerApiMethod<K> } = {
  document,
  nodeCreate,
  nodeDelete,
  updateNodeSettings,
  nodeSettings
}
