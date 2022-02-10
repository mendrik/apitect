import { cond, propEq } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { ArraySettings, DataSourceType } from '~shared/types/forms/nodetypes/arraySettings'

import { validateValues } from '../datasources/arrayItem'
import { DataSource } from '../datasources/datasource'
import { externalDataSource } from '../datasources/externalDatabase'
import { internalDataSource } from '../datasources/internal'
import { nodeSettings } from './nodeSettings'

export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  email,
  payload: { arrayNodeId, tag }
}) => {
  const values = await validateValues(docId, email, tag, arrayNodeId)
  const arraySettings = (await nodeSettings({
    docId,
    email,
    payload: arrayNodeId
  })) as ArraySettings
  const dataSource: DataSource = cond([
    [propEq<string>('dataSource', DataSourceType.Internal), internalDataSource(arrayNodeId)],
    [propEq<string>('dataSource', DataSourceType.Database), externalDataSource(arrayNodeId)]
  ])(arraySettings)
  return dataSource.upsertItem(values)
}
