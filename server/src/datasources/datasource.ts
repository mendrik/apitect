import { Id } from '~shared/types/domain/id'

export type DataSource = {
  upsertItem: <T extends object>(item: T) => Id
  deleteItem: (id: Id) => void
  count: () => number
  search: <T>(key: string) => T[]
  list: <T>(index: number, count: number) => T[]
}
