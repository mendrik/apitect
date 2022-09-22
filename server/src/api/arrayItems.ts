import { ServerApiMethod } from '~shared/apiResponse'

export const arrayItems: ServerApiMethod<'arrayItems'> = () => Promise.resolve({ items: [] })
