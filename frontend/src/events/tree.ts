import { createEvent } from 'effector'

import { Node } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'

export const openNodeState = createEvent<[Node, boolean]>('toggle-node')
export const openNode = (node: Maybe<Node>) => (node ? openNodeState([node, true]) : void 0)
export const closeNode = (node: Maybe<Node>) => (node ? openNodeState([node, false]) : void 0)
export const deleteNode = createEvent<Maybe<Node>>('delete-node')
export const selectNode = createEvent<Maybe<Node>>('select-node')
