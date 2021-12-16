import { createEvent } from 'effector'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'

export const openArrayDrawer = createEvent<ArraySettings>('open-array-drawer')
export const closeArrayDrawer = createEvent()
