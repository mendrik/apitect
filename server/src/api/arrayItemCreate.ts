import { ServerApiMethod } from '~shared/apiResponse'
import { logger } from '~shared/utils/logger'

import { nodeSettings } from './nodeSettings'

export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  email,
  payload: { arrayNodeId, tag }
}) => {
  const arraySettings = await nodeSettings({ docId, email, payload: arrayNodeId })
  logger.info('created', { docId, arrayNodeId, tag, arraySettings })
  return undefined
}
