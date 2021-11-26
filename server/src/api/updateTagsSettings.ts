import { isNil, prop } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { TagsSettings } from '~shared/types/forms/tagsSettings'
import { failOn } from '~shared/utils/failOn'

import { collection, Collections } from '../services/database'

export const updateTagsSettings: ServerApiMethod<'updateTagsSettings'> = ({
  docId,
  payload: tagsSettings
}) =>
  collection(Collections.tagsSettings)
    .findOneAndReplace(
      { docId },
      { ...tagsSettings, docId },
      { upsert: true, returnDocument: 'after' }
    )
    .then(prop('value'))
    .then(failOn<TagsSettings>(isNil, 'failed to persists project tags settings'))
