import { Id } from '~shared/types/domain/id'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ValueList } from '~shared/types/response/valueList'

export type ListResult<T> = {
  count: number
  index: number
  items: T[]
}

export type DataSource = {
  upsertItem: (values: Record<NodeId, Value>) => Promise<ValueList>
  deleteItem: (id: Id) => Promise<void>
  list: <T>(index: number, count: number, searchKey?: string) => Promise<ListResult<T>>
}
