import { createEvent } from 'effector'

import { Document } from '../shared/types/domain/document'
import { Node } from '../shared/types/domain/tree'
import { NewNode } from '../shared/types/forms/newNode'
import { Maybe } from '../shared/types/generic'

export const openNodeState = createEvent<[Node, boolean]>('toggle-node')
export const openNode = (node: Maybe<Node>) => (node ? openNodeState([node, true]) : void 0)
export const closeNode = (node: Maybe<Node>) => (node ? openNodeState([node, false]) : void 0)
export const selectNode = createEvent<Maybe<Node>>('select-node')
export const documentLoaded = createEvent<Document>('document-loaded')
export const deleteNode = createEvent<string>('delete node')
export const createNode = createEvent<NewNode>('create node')
