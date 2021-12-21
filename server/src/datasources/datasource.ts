import { Id } from '~shared/types/domain/id'

export type ListResult<T> = {
  count: number
  items: T[]
}

export type DataSource = {
  upsertItem: <T extends object>(item: T) => Promise<Id>
  deleteItem: (id: Id) => Promise<void>
  list: <T>(index: number, count: number, searchKey?: string) => Promise<ListResult<T>>
}
