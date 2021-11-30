import { array, object, string } from 'zod'

export const ZValueListRequest = object({
  tag: string().optional(),
  nodeIds: array(string())
})
