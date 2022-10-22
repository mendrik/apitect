/* eslint-disable @typescript-eslint/no-unused-vars */
import { keys, prop } from 'ramda'
import { newId } from '~shared/codecs/idCodec'
import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ValueList } from '~shared/types/response/valueList'

import { valueList } from '../api/valueList'
import { collection, Collections } from '../services/database'
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
  async insertItem(values: Value[]): Promise<Id> {
    const arrayItemId = newId()
    const nodeIds = values.map(prop('nodeId'))
    await collection(Collections.values).updateMany(
      { docId, tag, nodeId: { $in: nodeIds }, arrayItemId: { $exists: false } },
      { $set: { arrayItemId } }
    )
    return arrayItemId
  },
  async updateItem(arrayItemId: Id, values: Record<NodeId, Value>): Promise<ValueList> {
    const nodeIds = keys(values)
    /*
      await collection(Collections.values).updateMany(
        { docId, tag, nodeId: { $in: nodeIds }, arrayItemId },
        { $set: { arrayItemId } }
      )
      */
    return valueList({ docId, email, payload: { tag, nodeIds } })
  }
})

export { dataSource as internalDataSource }
