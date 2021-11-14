import { assoc, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'

import { withTree } from '../services'
import { collection, Collections } from '../services/database'

export const updateNodeSettings: ServerApiMethod<'updateNodeSettings'> = ({
  email,
  payload: nodeSettings
}) =>
  withTree(email)(root =>
    root.update(propEq('id', nodeSettings.nodeId), assoc('name', nodeSettings.name))
  ).then(op =>
    collection(Collections.nodeSettings)
      .findOneAndUpdate({ nodeId: nodeSettings.nodeId }, { $set: nodeSettings }, { upsert: true })
      .then(() => op.self.extract())
  )
