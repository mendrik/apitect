import { ZodError } from 'zod'
import { ApiError, ZApiError } from '~shared/apiResponse'
import { Fn } from '~shared/types/generic'
import { HttpError } from '~shared/types/httpError'
import { NotificationError } from '~shared/types/notificationError'
import { logger } from '~shared/utils/logger'

import { getStack } from './errors'

export const socketErrorHandler =
  (send: Fn, id: string) =>
  (e: Error): void => {
    logger.error(e.message, getStack(e))
    const $send = (data: Omit<ApiError, 'error' | 'id'>) =>
      send(JSON.stringify(ZApiError.parse({ id, error: 'error', ...data })))

    if (e instanceof ZodError) {
      return $send({ status: 400, message: e.message })
    }
    if (e instanceof HttpError) {
      return $send({ status: e.status, message: e.message, field: e.field })
    }
    if (e instanceof NotificationError) {
      return $send({
        status: 400,
        message: e.message,
        title: e.title,
        notificationType: e.type,
        uniqueId: e.uniqueId
      })
    }
    return $send({ status: 500, message: e.message })
  }
