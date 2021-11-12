import * as t from 'io-ts'
import { Output } from '~shared/api'
import { ServerApiMethod } from '~shared/apiResponse'

import { getLastDocument } from '../services'

type Y = t.OutputOf<Output<'document'>>

export const document: ServerApiMethod<'document'> = ({ respond, email }) =>
  getLastDocument(email).then(respond)
