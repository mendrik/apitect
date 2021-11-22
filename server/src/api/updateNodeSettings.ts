import { assoc, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'

import { getLastDocumentId, withTree } from '../services'
import { collection, Collections } from '../services/database'

export const updateNodeSettings: ServerApiMethod<'updateNodeSettings'> = ({
  email,
  payload: nodeSettings
}) =>
  withTree(email)(root =>
    root.update(propEq('id', nodeSettings.nodeId), assoc('name', nodeSettings.name))
  ).then(op =>
    getLastDocumentId(email).then(documentId =>
      collection(Collections.nodeSettings)
        .findOneAndReplace(
          { nodeId: nodeSettings.nodeId },
          { ...nodeSettings, documentId },
          { upsert: true }
        )
        .then(() => op.self.extract())
    )
  )
