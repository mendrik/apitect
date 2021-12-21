import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'

import { DataSource, ListResult } from './datasource'

const dataSource = (arrayNodeId: NodeId): DataSource => ({
  deleteItem(id: Id): Promise<void> {
    return Promise.resolve(undefined)
  },
  list<T>(index: number, count: number, searchKey: string | undefined): Promise<ListResult<T>> {
    return Promise.resolve({
      count: 0,
      items: []
    })
  },
  upsertItem<T>(item: T): Promise<Id> {
    return Promise.resolve('')
  }
})

export { dataSource as externalDataSource }
