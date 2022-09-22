import { any, object, record, string, union } from 'zod'
import { TypeOf } from 'zod/lib/types'

const ZItem = union([
  object({
    id: string(),
    displayString: string()
  }),
  record(string().min(1), any())
])

export type Item = TypeOf<typeof ZItem>
