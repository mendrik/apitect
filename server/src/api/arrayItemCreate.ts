import { ServerApiMethod } from '~shared/apiResponse'
import { NodeType } from '~shared/types/domain/nodeType'
import { DataSourceType } from '~shared/types/forms/nodetypes/arraySettings'
import { logger } from '~shared/utils/logger'

import { getArrayItem } from '../datasources/arrayItem'
import { DataSource } from '../datasources/datasource'
import { externalDataSource } from '../datasources/externalDatabase'
import { internalDataSource } from '../datasources/internal'
import { nodeSettings } from './nodeSettings'

export const arrayItemCreate: ServerApiMethod<'arrayItemCreate'> = async ({
  docId,
  email,
  payload: { arrayNodeId, tag }
}) => {
  const item: any = await getArrayItem(docId, email, tag, arrayNodeId)
  const arraySettings = await nodeSettings({ docId, email, payload: arrayNodeId })
  const dataSource: DataSource =
    arraySettings?.nodeType === NodeType.Array &&
    arraySettings.dataSource === DataSourceType.Internal
      ? internalDataSource(arrayNodeId)
      : externalDataSource(arrayNodeId)
  await dataSource.upsertItem(item)
  logger.info('created', { docId, arrayNodeId, tag, arraySettings })
  return {
    values: []
  }
}
