import { ServerApiMethod } from '~shared/apiResponse'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'

import { collection, Collections } from '../services/database'
import { projection } from '../utils/projection'

export const allNodeSettings = (docId: string): Promise<NodeSettings[]> =>
  collection(Collections.nodeSettings).find<NodeSettings>({ docId }).toArray()

export const nodeSettings: ServerApiMethod<'nodeSettings'> = ({ payload: nodeId }) =>
  collection(Collections.nodeSettings).findOne<NodeSettings>({ nodeId }, { projection })
