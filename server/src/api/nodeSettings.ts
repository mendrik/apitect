import { isNil } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { NodeSettings } from '~shared/types/forms/nodetypes/nodeSettings'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const nodeSettings: ServerApiMethod<'nodeSettings'> = ({ payload: id }) =>
  collection(Collections.nodeSettings)
    .findOne({ nodeId: id })
    .then(failOn<NodeSettings>(isNil, `Node settings not found for ${id}`))
