import { ObjectId, WithId } from 'mongodb'
import { isNil } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { TUiDocument } from '~shared/types/domain/document'
import { wrapServerMessage } from '~shared/types/serverMessages'
import { failOn } from '~shared/utils/failOn'
import { field } from '~shared/utils/ramda'

import { Document } from '../types/document'
import { Node } from '../types/tree'
import { User } from '../types/user'
import { collection } from './database'
import { eventMap, serverState } from './serverState'

export const toTreeNode = (node: Node) => TreeNode.from<Node, 'children'>('children')(node)

export const getLastDocument = (userId: ObjectId): Promise<WithId<Document>> =>
  collection('users')
    .findOne({ _id: userId })
    .then(failOn<User>(isNil, 'user not found'))
    .then(field('lastDocument'))
    .then(docId =>
      collection('documents')
        .findOne({ _id: docId })
        .then(failOn(isNil, `Document ${docId} not found`))
    )

serverState.on(eventMap.DOCUMENT, (state, { send, userId }) => {
  void getLastDocument(userId).then(wrapServerMessage(TUiDocument)).then(send)
})
