import { flip, fromPairs, isNil, map, mapObjIndexed, pipe, prop, reject, unless, zip } from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { TagsSettings } from '~shared/types/forms/tagsSettings'
import { Fn } from '~shared/types/generic'
import { failOn } from '~shared/utils/failOn'
import { resolvePromised } from '~shared/utils/promise'

import { collection, Collections } from '../services/database'
import { renameTag } from '../services/tags'

const renameMap: Fn<Record<string, string>> = pipe<any, any, any, any, any, Record<string, string>>(
  zip as any,
  map(map(prop('name'))),
  fromPairs,
  mapObjIndexed((v, k) => (k === v ? undefined : v)),
  reject(isNil)
)

export const updateTagsSettings: ServerApiMethod<'updateTagsSettings'> = ({
  docId,
  payload: tagsSettings
}) =>
  collection(Collections.tagsSettings)
    .findOne<TagsSettings>({ docId })
    .then(
      unless(isNil, oldSettings => {
        const renamedTags = renameMap(oldSettings.tags, tagsSettings.tags)
        return resolvePromised(mapObjIndexed(flip(renameTag(docId)), renamedTags))
      })
    )
    .then(() =>
      collection(Collections.tagsSettings)
        .findOneAndReplace(
          { docId },
          { ...tagsSettings, docId },
          { upsert: true, returnDocument: 'after' }
        )
        .then(prop('value'))
        .then(failOn<TagsSettings>(isNil, 'failed to persists project tags settings'))
    )
