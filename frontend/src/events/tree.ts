import { createEvent } from 'effector'

import { UiNode } from '../shared/types/domain/tree'

export const openNode = createEvent<[string, boolean]>()
export const deleteNode = createEvent<UiNode>()
export const selectNode = createEvent<UiNode | undefined>()
export const deselectNode = createEvent()
