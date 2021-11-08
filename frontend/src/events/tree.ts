import { createEvent } from 'effector'

import { VisualNode } from '../components/specific/VisualNodeTemplate'

export const selectNode = createEvent<VisualNode | undefined>()
export const deselectNode = createEvent()
export const deleteNode = createEvent<VisualNode>()
