import { ServerApiMethod } from '~shared/apiResponse'
import { resolvePromised } from '~shared/utils/promise'

import { getArrayItems, getItemsTotal } from '../services/arrayItems'

export const arrayItems: ServerApiMethod<'arrayItems'> = ({
  docId,
  payload: { arrayNodeId, page, pageSize, tag }
}) =>
  resolvePromised({
    items: getArrayItems(docId, tag, arrayNodeId, page, pageSize),
    pageSize,
    page,
    total: getItemsTotal(docId, tag, arrayNodeId)
  })
