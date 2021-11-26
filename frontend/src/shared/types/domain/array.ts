import { Maybe } from '../generic'

export type ArrayAdapter<ENTRY> = {
  search(needle: string): ENTRY[]
  slice(index: number, pageSize: number): ENTRY[]
  count(): number
  item(idField: string): Maybe<ENTRY>
  upsert(entry: ENTRY): ENTRY
  delete(entry: ENTRY): void
}
