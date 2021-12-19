import { ServerApiMethod } from '~shared/apiResponse'
import { logger } from '~shared/utils/logger'

export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  payload: { arrayNodeId, tag }
}) => {
  logger.info('created', { docId, arrayNodeId, tag })
  return undefined
}
