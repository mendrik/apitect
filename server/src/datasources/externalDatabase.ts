import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'
import { ValueList } from '~shared/types/response/valueList'

import { DataSource, ListResult } from './datasource'

const dataSource =
  (arrayNodeId: NodeId, docId: string, email: string, tag: string) =>
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
    insertItem(item: Record<NodeId, Value>): Promise<Id> {
      return Promise.resolve('uuid')
    },
    updateItem(id: Id, item: Record<NodeId, Value>): Promise<ValueList> {
      return Promise.resolve({ values: [] })
    }
  })

export { dataSource as externalDataSource }
