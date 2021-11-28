import { logger } from './logger'

export const logAndThrow = (e: Error): never => {
  logger.error(e.message, e)
  throw e
}
