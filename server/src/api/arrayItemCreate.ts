import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { CreateItemResponse } from '~shared/types/response/createItemResponse'
import { resolvePromised } from '~shared/utils/promise'

import { validateValues } from '../datasources/arrayItem'
import { getDataSource } from '../services/datasource'

/**
 * The item is created from existing values that have no arrayNodeId assigned to them
 * yet. All this does is assign those values an arrayItemId.
 * @param docId
 * @param email
 * @param arrayNodeId
 * @param tag
 */
export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  email,
  payload: { arrayNodeId, tag }
}) => {
  const values: Value[] = await validateValues(docId, email, tag, arrayNodeId)
  const dataSource = await getDataSource(docId, tag, email, arrayNodeId)
  return resolvePromised<CreateItemResponse>({
    arrayItemId: dataSource.insertItem(values),
    arrayNodeId,
    values
  })
}
