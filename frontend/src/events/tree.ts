import { createEvent } from 'effector'

import { UiNode } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'

export const openNodeState = createEvent<[UiNode, boolean]>('toggle-node')
export const openNode = (node: Maybe<UiNode>) => (node ? openNodeState([node, true]) : void 0)
export const closeNode = (node: Maybe<UiNode>) => (node ? openNodeState([node, false]) : void 0)
export const deleteNode = createEvent<Maybe<UiNode>>('delete-node')
export const selectNode = createEvent<Maybe<UiNode>>('select-node')
export const deselectNode = createEvent('deselect-node')
