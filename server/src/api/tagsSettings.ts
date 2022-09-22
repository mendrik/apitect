import { ServerApiMethod } from '~shared/apiResponse'
import { TagsSettings } from '~shared/types/forms/tagsSettings'

import { collection, Collections } from '../services/database'
import { projection } from '../utils/projection'

export const tagsSettings: ServerApiMethod<'tagsSettings'> = ({ docId }) =>
  collection(Collections.tagsSettings).findOne<TagsSettings>({ docId }, { projection })
