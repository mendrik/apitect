import { Id } from '~shared/types/domain/id'
import { Item } from '~shared/types/domain/item'
import { NodeId } from '~shared/types/domain/node'
import { Value } from '~shared/types/domain/values/value'
import { ValueList } from '~shared/types/response/valueList'

export type DataSource = {
  insertItem: (values: Value[]) => Promise<Id>
  updateItem: (id: Id, values: Record<NodeId, Value>) => Promise<ValueList>
  deleteItem: (id: Id) => Promise<void>
  list: (page: number, pageSize: number, search: Document) => Promise<Item[]>
}
