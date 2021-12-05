import { ServerApiMethod } from '~shared/apiResponse'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'

import { collection, Collections } from '../services/database'

export const nodeSettings: ServerApiMethod<'nodeSettings'> = ({ payload: nodeId }) =>
  collection(Collections.nodeSettings).findOne<NodeSettings>({ nodeId }, { projection: { _id: 0 } })
