import { v4 as uuid } from 'uuid'
import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'
import { logger } from '~shared/utils/logger'

import { DataSource, ListResult } from './datasource'

const dataSource =
  (arrayNodeId: NodeId) =>
  (arraySettings: ArraySettings): DataSource => ({
    deleteItem(id: Id): Promise<void> {
      return Promise.resolve(undefined)
    },
    list<T>(index: number, count: number, searchKey: string | undefined): Promise<ListResult<T>> {
      return Promise.resolve({
        count,
        index,
        items: []
      })
    },
    async upsertItem<T>(item: T): Promise<Id> {
      const arrayItemId = uuid()
      logger.info('Creating item', item)
      // await collection(Collections.values).updateMany({}, {})
      return arrayItemId
    }
  })

export { dataSource as internalDataSource }
