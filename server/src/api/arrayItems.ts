import { ServerApiMethod } from '~shared/apiResponse'

export const arrayItems: ServerApiMethod<'arrayItems'> = async ({
  payload: { arrayNodeId, page, pageSize, tag }
}) => ({
  items: [],
  pageSize,
  page,
  total: 0
})
