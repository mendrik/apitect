import { ServerApiMethod } from '~shared/apiResponse'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'

import { collection, Collections } from '../services/database'

export const nodeSettings: ServerApiMethod<'nodeSettings'> = ({ payload: id }) =>
  collection(Collections.nodeSettings).findOne<NodeSettings>({ nodeId: id })
