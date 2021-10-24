import { logger } from './logger'

export const logAndRecover =
  <T>(recoverWith: T) =>
  (e: Error): Promise<T> => {
    logger.warn(e.message, e)
    return Promise.resolve(recoverWith)
  }
