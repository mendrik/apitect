import { createStore } from 'effector'
import { propEq, reject } from 'ramda'
import { ZodError } from 'zod'
import { Notification } from '~shared/types/domain/notification'
import { logger } from '~shared/utils/logger'
import { safeParseJson } from '~shared/utils/ramda'

import { IdNotification, removeNotification, showNotification } from '../events/notifications'
import { resetProject } from '../events/reset'

export const $notificationsStore = createStore<IdNotification[]>([])
  .on(showNotification, (state, notification) => [...state, notification])
  .on(removeNotification, (state, id) => reject(propEq('id', id), state))
  .reset(resetProject)

showNotification.watch(payload => {
  logger.debug('Notification', payload)
  if (payload.title === 'validation.failed') {
    const error = safeParseJson<ZodError>(payload.content)
    error?.issues?.forEach(issue => {})
  }
})
