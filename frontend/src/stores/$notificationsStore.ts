import { createStore } from 'effector'
import { Notification } from '~shared/types/domain/notification'

import { showNotification } from '../events/notifications'
import { resetProject } from '../events/reset'

export const $notificationsStore = createStore<Notification[]>([])
  .on(showNotification, (state, notification) => [...state, notification])
  .reset(resetProject)
