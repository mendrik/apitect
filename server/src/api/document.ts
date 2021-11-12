import { getLastDocument } from '../services'
import { ServerApiMethod } from './serverApi'

export const document: ServerApiMethod<'document'> = ({ respond, email }) =>
  getLastDocument(email).then(respond)
