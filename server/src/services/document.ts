import { WithId } from 'mongodb'
import { isNil } from 'ramda'
import { TreeNode } from '~shared/algebraic/treeNode'
import { decode } from '~shared/codecs/decode'
import { idCodec } from '~shared/codecs/idCodec'
import { Document } from '~shared/types/domain/document'
import { Id } from '~shared/types/domain/id'
import { Node } from '~shared/types/domain/tree'
import { failOn } from '~shared/utils/failOn'
import { field } from '~shared/utils/ramda'

import { collection } from './database'
import { eventMap, serverState } from './serverState'
import { getUser } from './user'

export const toTreeNode = (node: Node) => TreeNode.from<Node, 'children'>('children')(node)

export const getLastDocumentId = (email: string): Promise<Id> =>
  getUser(email).then(field('lastDocument')).then(decode(idCodec))

export const getLastDocument = (email: string): Promise<WithId<Document>> =>
  getLastDocumentId(email)
    .then(collection('documents').findOne)
    .then(failOn<WithId<Document>>(isNil, 'document not found'))

serverState.on(eventMap.DOCUMENT, (state, { send, email }) => {
  void getLastDocument(email).then(send('DOCUMENT'))
})
