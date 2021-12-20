import { propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { logger } from '~shared/utils/logger'

import { getTree } from '../services'
import { nodeSettings } from './nodeSettings'

export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  email,
  payload: { arrayNodeId, tag }
}) => {
  const arraySettings = await nodeSettings({ docId, email, payload: arrayNodeId })
  const tree = await getTree(docId)
  const node = tree.first(propEq<string>('nodeId', arrayNodeId))
  if (node === null) {
    throw Error(`Unable to find node ${arrayNodeId} in document ${docId}`)
  }
  logger.info('created', { docId, arrayNodeId, tag, arraySettings })
  return undefined
}
