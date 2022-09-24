import { cond, propEq } from 'ramda'
import { TagName } from '~shared/types/domain/tag'
import { ArraySettings, DataSourceType } from '~shared/types/forms/nodetypes/arraySettings'

import { nodeSettings } from '../api/nodeSettings'
import { DataSource } from '../datasources/datasource'
import { externalDataSource } from '../datasources/externalDatabase'
import { internalDataSource } from '../datasources/internal'

const isInternal = propEq('dataSource', DataSourceType.Internal)
const isDatabase = propEq('dataSource', DataSourceType.Database)

export const getDataSource = async (
  docId: string,
  tag: TagName,
  email: string,
  arrayNodeId: string
): Promise<DataSource> => {
  const arraySettings = await nodeSettings({ docId, email, payload: arrayNodeId })
  return cond([
    [isInternal, () => internalDataSource(arrayNodeId, docId, email, tag)],
    [isDatabase, () => externalDataSource(arrayNodeId, docId, email, tag)]
  ])(arraySettings as ArraySettings)
}
