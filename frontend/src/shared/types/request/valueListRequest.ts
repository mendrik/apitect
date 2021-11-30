import { array, object, string } from 'zod'

export const ZValueListRequest = object({
  tag: string(),
  nodeIds: array(string())
})
