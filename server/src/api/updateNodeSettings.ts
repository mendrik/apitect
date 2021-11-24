import { assoc, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'

import { withTree } from '../services'
import { collection, Collections } from '../services/database'

export const updateNodeSettings: ServerApiMethod<'updateNodeSettings'> = ({
  docId,
  payload: nodeSettings
}) =>
  withTree(docId)(root =>
    root.update(propEq('id', nodeSettings.nodeId), assoc('name', nodeSettings.name))
  ).then(op =>
    collection(Collections.nodeSettings)
      .findOneAndReplace(
        { nodeId: nodeSettings.nodeId },
        { ...nodeSettings, docId },
        { upsert: true }
      )
      .then(() => op.self.extract())
  )
