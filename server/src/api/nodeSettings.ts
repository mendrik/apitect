import { isNil } from 'ramda'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'
import { ServerApiMethod } from './serverApi'

export const nodeSettings: ServerApiMethod<'nodeSettings'> = ({ respond, email, payload: id }) =>
  collection(Collections.nodeSettings)
    .findOne({ nodeId: id })
    .then(failOn<NodeSettings>(isNil, `Node settings not found for ${id}`))
