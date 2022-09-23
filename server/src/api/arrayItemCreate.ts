import { cond, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Value } from '~shared/types/domain/values/value'
import { ArraySettings, DataSourceType } from '~shared/types/forms/nodetypes/arraySettings'
import { CreateItemResponse } from '~shared/types/response/createItemResponse'
import { resolvePromised } from '~shared/utils/promise'

import { validateValues } from '../datasources/arrayItem'
import { DataSource } from '../datasources/datasource'
import { externalDataSource } from '../datasources/externalDatabase'
import { internalDataSource } from '../datasources/internal'
import { nodeSettings } from './nodeSettings'

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
  const arraySettings = await nodeSettings({ docId, email, payload: arrayNodeId })
  const dataSource: DataSource = cond([
    [
      propEq('dataSource', DataSourceType.Internal),
      internalDataSource(arrayNodeId, docId, email, tag)
    ],
    [
      propEq('dataSource', DataSourceType.Database),
      externalDataSource(arrayNodeId, docId, email, tag)
    ]
  ])(arraySettings as ArraySettings)
  return resolvePromised<CreateItemResponse>({
    arrayItemId: dataSource.insertItem(values),
    arrayNodeId,
    values
  })
}
