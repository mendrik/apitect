import { createEvent } from 'effector'
import { Notification } from '~shared/types/domain/notification'

export const showNotification = createEvent<Notification>('show-notification')
export const removeNotification = createEvent<Notification>('remove-notification')
