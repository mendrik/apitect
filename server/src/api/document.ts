import { ServerApiMethod } from '~shared/apiResponse'

import { getLastDocument } from '../services'

export const document: ServerApiMethod<'document'> = ({ email }) => getLastDocument(email)
