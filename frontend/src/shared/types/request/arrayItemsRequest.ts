import { number, object, string } from 'zod'
import { arrayNodeId } from '~shared/codecs/idCodec'

import { defaultPageSize } from '../../../constants'

export const ZArrayItemsRequest = object({
  page: number(),
  pageSize: number().default(defaultPageSize),
  tag: string(),
  arrayNodeId
})
