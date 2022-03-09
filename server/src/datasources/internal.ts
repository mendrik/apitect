import { keys } from 'ramda'
import { v4 as uuid } from 'uuid'
import { ServerParam } from '~shared/apiResponse'
import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ArraySettings } from '~shared/types/forms/nodetypes/arraySettings'
import { ValueList } from '~shared/types/response/valueList'

import { valueList } from '../api/valueList'
import { collection, Collections } from '../services/database'
import { DataSource, ListResult } from './datasource'

const dataSource =
  (docId: string, email: string, arrayNodeId: NodeId, tag: string) =>
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
    async upsertItem(values: Record<NodeId, Value>): Promise<ValueList> {
      const arrayItemId = uuid()
      const nodeIds = keys(values)
      await collection(Collections.values).updateMany(
        { docId, nodeId: { $in: nodeIds } },
        { $set: { arrayItemId } }
      )
      const params: ServerParam<'valueList'> = {
        docId,
        email,
        payload: {
          tag,
          nodeIds
        }
      }
      return valueList(params)
    }
  })

export { dataSource as internalDataSource }
