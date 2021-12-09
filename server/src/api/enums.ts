import { ServerApiMethod } from '~shared/apiResponse'
import { Enums } from '~shared/types/domain/enums'

import { collection, Collections } from '../services/database'

export const enums: ServerApiMethod<'enums'> = ({ docId }) =>
  collection(Collections.enums).findOne<Enums>({ docId }, { projection: { _id: 0, docId: 0 } })
