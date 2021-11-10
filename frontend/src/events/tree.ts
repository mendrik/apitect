import { createEvent } from 'effector'

import { UiNode } from '../shared/types/domain/tree'
import { Maybe } from '../shared/types/generic'

export const openNodeState = createEvent<[UiNode, boolean]>()
export const openNode = (node: Maybe<UiNode>) => (node ? openNodeState([node, true]) : void 0)
export const closeNode = (node: Maybe<UiNode>) => (node ? openNodeState([node, false]) : void 0)
export const deleteNode = createEvent<Maybe<UiNode>>()
export const selectNode = createEvent<Maybe<UiNode>>()
export const deselectNode = createEvent()
