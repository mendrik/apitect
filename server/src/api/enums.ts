import { ServerApiMethod } from '~shared/apiResponse'
import { Enums } from '~shared/types/domain/enums'

import { collection, Collections } from '../services/database'
import { defaultProjection } from '../utils/projection'

export const enums: ServerApiMethod<'enums'> = ({ docId }) =>
  collection(Collections.enums).findOne<Enums>({ docId }, defaultProjection)
