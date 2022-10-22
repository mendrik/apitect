import {
  complement,
  equals,
  flip,
  fromPairs,
  isNil,
  mapObjIndexed,
  pickBy,
  pipe,
  prop,
  unless,
  zipWith
} from 'ramda'
import { ServerApiMethod } from '~shared/apiResponse'
import { Tag } from '~shared/types/domain/tag'
import { TagsSettings } from '~shared/types/forms/tagsSettings'
import { Fn } from '~shared/types/generic'
import { failOn } from '~shared/utils/failOn'
import { resolvePromised } from '~shared/utils/promise'

import { collection, Collections } from '../services/database'
import { renameTag } from '../services/tags'

export const renameMap = pipe(
  zipWith((a: Tag, b: Tag) => [a.name, b.name] as const),
  fromPairs,
  pickBy(complement(equals)) as Fn<Record<string, string>>
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
