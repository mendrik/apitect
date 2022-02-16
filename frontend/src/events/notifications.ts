import { createEvent } from 'effector'
import { Notification } from '~shared/types/domain/notification'

export type IdNotification = Notification & { id: string }
export const showNotification = createEvent<IdNotification>('show-notification')
export const removeNotification = createEvent<string>('remove-notification')
