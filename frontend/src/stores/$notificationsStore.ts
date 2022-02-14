import { createStore } from 'effector'
import { without } from 'ramda'
import { Notification } from '~shared/types/domain/notification'
import { logger } from '~shared/utils/logger'

import { removeNotification, showNotification } from '../events/notifications'
import { resetProject } from '../events/reset'

export const $notificationsStore = createStore<Notification[]>([])
  .on(showNotification, (state, notification) => [...state, notification])
  .on(removeNotification, (state, notification) => without([notification], state))
  .reset(resetProject)

showNotification.watch(payload => {
  logger.debug('Notification', payload)
})
