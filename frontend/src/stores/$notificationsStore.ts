import { createStore } from 'effector'
import { propEq, reject } from 'ramda'
import { Notification } from '~shared/types/domain/notification'
import { logger } from '~shared/utils/logger'

import { IdNotification, removeNotification, showNotification } from '../events/notifications'
import { resetProject } from '../events/reset'

export const $notificationsStore = createStore<IdNotification[]>([])
  .on(showNotification, (state, notification) => [...state, notification])
  .on(removeNotification, (state, id) => reject(propEq('id', id), state))
  .reset(resetProject)

showNotification.watch(payload => {
  logger.debug('Notification', payload)
  if (payload.title === 'validation.failed') {
    /* todo: show errors for each issue in UI and focus first?
      const error = safeParseJson<ZodError>(payload.content)
      error?.issues?.forEach(issue => {})
  */
  }
})
