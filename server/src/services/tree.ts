import { propEq } from 'ramda'

import { collection } from './database'
import { getLastDocument, toTreeNode } from './document'
import { eventMap, serverState } from './serverState'

// prettier-ignore
serverState.on(eventMap.NEW_NODE, (state, { send, userId, message: newNode }) => {
  void getLastDocument(userId).then(doc => {
    const path = toTreeNode(doc.tree).first(propEq('_id', newNode.parentNode))?.pathToRoot().join('.')
    console.log(path)
    return collection('documents')
      .updateOne({ _id: doc._id }, { $push: { 'x.children': newNode } })
  })
})
