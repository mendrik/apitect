import { v4 as uuid } from 'uuid'
import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'

import { collection, Collections } from '../services/database'
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
      // await collection(Collections.values).updateMany({}, {})
      return arrayItemId
    }
  })

export { dataSource as internalDataSource }
