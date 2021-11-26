import { ServerApiMethod } from '~shared/apiResponse'
import { TagsSettings } from '~shared/types/forms/tagsSettings'

import { collection, Collections } from '../services/database'

export const tagsSettings: ServerApiMethod<'tagsSettings'> = ({ docId }) =>
  collection(Collections.tagsSettings).findOne<TagsSettings>(
    { docId },
    { projection: { _id: 0, docId: 0 } }
  )
