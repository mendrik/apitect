/* eslint-disable @typescript-eslint/no-unused-vars */
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ValueList } from '~shared/types/response/valueList'

import { DataSource } from './datasource'

const dataSource = (
  arrayNodeId: NodeId,
  docId: string,
  email: string,
  tag: string
): DataSource => ({
  deleteItem(id: Id): Promise<void> {
    return Promise.resolve(undefined)
  },
  async list(page: number, pageSize: number, search: Document): Promise<Item[]> {
    return []
  },
  insertItem(item: Value[]): Promise<Id> {
    return Promise.resolve('uuid')
  },
  updateItem(id: Id, item: Record<NodeId, Value>): Promise<ValueList> {
    return Promise.resolve({ values: [] })
  }
})

export { dataSource as externalDataSource }
